const statusOptions={enquiries:['new','reviewing','awaiting-client','closed'],posts:['draft','published'],consultations:['requested','scheduled','completed','cancelled']};
function consultationServiceField(){
  let services=[];
  const select=field('service','Service','','text',[]);select.required=true;
  const placeholder=node('option','Loading services…');placeholder.value='';placeholder.disabled=true;placeholder.selected=true;select.append(placeholder);
  const retry=node('button','Retry loading services');retry.type='button';retry.hidden=true;select.parentElement.append(retry);
  const subservices=node('fieldset',undefined,'consultation-subservices');subservices.hidden=true;$('fields').append(subservices);
  select.onchange=()=>{
    subservices.replaceChildren();
    const options=services.find(service=>service.title===select.value)?.subservices||[];
    subservices.hidden=!select.value;
    subservices.append(node('legend','Sub-services'),node('p',options.length?'Select all that apply.':'No sub-services listed for this service.','muted'));
    const selected=node('div',undefined,'selected-subservices');selected.hidden=true;
    const count=node('p',undefined,'selected-subservice-count');count.setAttribute('role','status');
    const tags=node('div',undefined,'selected-subservice-tags');selected.append(count,tags);subservices.append(selected);
    const list=node('div',undefined,'consultation-subservice-options');
    const inputs=[];
    function renderSelected(){
      const checked=inputs.filter(input=>input.checked);selected.hidden=!checked.length;
      count.textContent=checked.length+' selected';tags.replaceChildren();
      for(const input of checked){const tag=node('button',undefined,'subservice-tag');tag.type='button';tag.setAttribute('aria-label','Remove '+input.value);tag.append(node('span',input.value),node('span','×','subservice-tag-remove'));tag.onclick=()=>{input.checked=false;renderSelected();input.focus();};tags.append(tag);}
      for(const input of inputs)input.parentElement.classList.toggle('is-selected',input.checked);
    }
    for(const title of options){const label=node('label');const input=node('input');input.type='checkbox';input.name='subservices';input.value=title;input.onchange=renderSelected;inputs.push(input);label.append(input,node('span',title));list.append(label);}
    subservices.append(list);
  };
  async function populate(){
    retry.hidden=true;placeholder.textContent='Loading services…';select.setAttribute('aria-busy','true');
    try{
      const result=await api('services');if(!select.isConnected)return;
      if(!result.items?.length)throw new Error('No services available');
      services=result.items;
      placeholder.textContent='Select a service';
      for(const service of result.items){const option=node('option',service.title);option.value=service.title;select.append(option);}
    }catch{if(select.isConnected){placeholder.textContent='Unable to load services';retry.hidden=false;}}
    finally{select.removeAttribute('aria-busy');}
  }
  retry.onclick=populate;populate();
}
let calendarMonth=new Date().toISOString().slice(0,7);
function configureAccess(){
  const permitted=user.role==='admin'?['enquiries','posts','consultations','calendar','staff','activity','account']:user.role==='editor'?['posts','account']:['enquiries','consultations','calendar','account'];
  document.querySelectorAll('[data-view]').forEach(button=>button.hidden=!permitted.includes(button.dataset.view));
  if(!permitted.includes(view))view=permitted[0];
}
function listQuery(){return new URLSearchParams({q:$('search').value,status:$('statusFilter').value,overdue:String(view==='enquiries'&&$('overdue').checked)}).toString();}
function resetFilters(){
  $('statusFilter').replaceChildren();for(const value of ['',...(statusOptions[view]||[])]){const option=node('option',value||'All statuses');option.value=value;$('statusFilter').append(option);}
  $('overdue').checked=false;$('overdueLabel').hidden=view!=='enquiries';$('export').hidden=view!=='enquiries';
}
for(const id of ['statusFilter','overdue'])$(id).onchange=()=>{page=1;load().catch(error);};
$('export').onclick=async()=>{try{const response=await fetch('/api/admin/enquiries/export?'+listQuery());if(!response.ok)throw new Error('Export failed. Check your session and try again.');const blob=await response.blob();const url=URL.createObjectURL(blob);const link=node('a');link.href=url;link.download='bba-enquiries.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){error(e);}};
function formInput(form,name,label,type='text',value='',options){
  const wrapper=node('label',label);const input=node(options?'select':'input');if(options)for(const item of options){const option=node('option',item);option.value=item;input.append(option);}else input.type=type;
  input.name=name;input.value=value;wrapper.append(input);form.append(wrapper);return input;
}
function submitForm(form,label,handler){
  const button=node('button',label,'primary');button.type='submit';const feedback=node('p');feedback.setAttribute('role','status');form.append(button,feedback);
  form.onsubmit=async event=>{event.preventDefault();button.disabled=true;feedback.textContent='Saving…';try{await handler(Object.fromEntries(new FormData(form)));feedback.textContent='Saved.';}catch(e){feedback.textContent=e.message;}finally{button.disabled=false;}};
}
function renderActivity(items,container){
  if(!items.length)container.append(node('p','No activity recorded yet.'));
  for(const item of items){const row=node('div',undefined,'row');const copy=node('div');copy.append(node('strong',item.action.replaceAll('-',' ')+' · '+item.kind),node('p',item.actor+' · '+new Date(item.createdAt).toUTCString()));let fields=[];try{fields=JSON.parse(item.fields);}catch{}if(fields.length)copy.append(node('p','Fields: '+fields.join(', ')));if(item.recordId)copy.append(node('small',item.recordId));row.append(copy);container.append(row);}
}
async function showRecordHistory(kind,id){
  try{const result=await api('history/'+kind+'/'+encodeURIComponent(id));if(current?.id!==id||!$('editor').open)return;const details=node('details');details.append(node('summary','Activity for this record'));renderActivity(result.items,details);$('recordHistory').replaceChildren(details);}catch(e){if(current?.id===id)$('recordHistory').textContent='Activity could not be loaded.';}
}
async function loadFeatureView(sequence){
  $('message').textContent='Loading…';$('heading').textContent={account:'My account',staff:'Staff access',activity:'Activity history',calendar:'Consultation calendar'}[view];$('records').replaceChildren();
  if(view==='account'){
    $('records').append(node('h2','Change password'),node('p','Changing your password signs out all your sessions.'));
    const form=node('form',undefined,'settings-form');const old=formInput(form,'currentPassword','Current password','password');old.autocomplete='current-password';old.required=true;
    const pass=formInput(form,'newPassword','New password (12–128 characters)','password');pass.autocomplete='new-password';pass.minLength=12;pass.maxLength=128;pass.required=true;
    const confirm=formInput(form,'confirmPassword','Confirm new password','password');confirm.autocomplete='new-password';confirm.required=true;
    submitForm(form,'Change password',async data=>{if(data.newPassword!==data.confirmPassword)throw new Error('New passwords do not match');await api('account/password','POST',{currentPassword:data.currentPassword,newPassword:data.newPassword});location.reload();});$('records').append(form);
  }else if(view==='staff'){
    const result=await api('staff');if(sequence!==generation)return;
    renderStaffAccess(result.items);
  }else if(view==='activity'){
    const result=await api('activity?page='+page);if(sequence!==generation)return;renderActivity(result.items,$('records'));$('pagination').hidden=false;$('page').textContent='Page '+page+' · '+result.total+' events';$('previous').disabled=page<=1;$('next').disabled=page*25>=result.total;
  }else if(view==='calendar'){
    const result=await api('consultations/calendar?month='+calendarMonth);if(sequence!==generation)return;renderCalendar(result.items);
  }
  if(sequence===generation)$('message').textContent='';
}
function renderStaffAccess(items){
  const root=node('section',undefined,'staff-access');
  const toolbar=node('div',undefined,'staff-toolbar');const add=node('button','Add staff','primary');add.type='button';toolbar.append(add);root.append(toolbar);
  const scroll=node('div',undefined,'staff-table-scroll');scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Staff accounts');
  const table=node('table',undefined,'staff-table');const head=node('thead'),headRow=node('tr');
  for(const title of ['Email','Role','Status','']){const th=node('th',title);th.scope='col';if(!title)th.setAttribute('aria-label','Actions');headRow.append(th);}head.append(headRow);table.append(head);
  const body=node('tbody');
  for(const member of items){
    const row=node('tr');const email=node('td',member.email);if(member.email===user.email)email.append(node('span',' (you)','staff-you'));row.append(email,node('td',member.role[0].toUpperCase()+member.role.slice(1)),node('td',member.active?'Active':'Disabled'));
    const action=node('td');if(member.email!==user.email){const edit=node('button','Edit','staff-edit');edit.type='button';edit.setAttribute('aria-label','Edit '+member.email);edit.onclick=()=>openForm(member);action.append(edit);}else action.append(node('span','—'));row.append(action);body.append(row);
  }
  if(!items.length){const row=node('tr'),cell=node('td','No staff accounts yet.');cell.colSpan=4;row.append(cell);body.append(row);}table.append(body);scroll.append(table);root.append(scroll);$('records').append(root);
  function openForm(member){
    const dialog=node('dialog',undefined,'staff-dialog');dialog.setAttribute('aria-label',member?'Edit staff access':'Add staff');const heading=node('div',undefined,'dialogHeader');heading.append(node('h2',member?'Edit staff':'Add staff'));const close=node('button','Close');close.type='button';close.onclick=()=>dialog.close();heading.append(close);dialog.append(heading);
    const form=node('form');if(member)form.append(node('p',member.email,'staff-dialog-email'));else{const email=formInput(form,'email','Email','email');email.required=true;email.autocomplete='off';const password=formInput(form,'password','Initial password','password');password.required=true;password.minLength=12;password.maxLength=128;password.autocomplete='new-password';form.append(node('p','At least 12 characters. Share securely; no email is sent.','staff-help'));}
    const role=formInput(form,'role','Role','text',member?.role||'staff',['staff','editor','admin']);for(const option of role.options)option.textContent=option.value[0].toUpperCase()+option.value.slice(1);
    if(member){const active=formInput(form,'active','Status','text',member.active?'enabled':'disabled',['enabled','disabled']);active.options[0].textContent='Active';active.options[1].textContent='Disabled';form.append(node('p','Saving access changes signs this person out.','staff-help'));}
    submitForm(form,member?'Save changes':'Create account',async data=>{if(member)await api('staff/'+encodeURIComponent(member.email),'PATCH',{role:data.role,active:data.active==='enabled'});else await api('staff','POST',data);dialog.close();await load();});dialog.append(form);root.append(dialog);dialog.onclose=()=>dialog.remove();dialog.showModal();form.querySelector('input,select')?.focus();
  }
  add.onclick=()=>openForm(null);
}
function renderCalendar(items){
  const toolbar=node('div',undefined,'toolbar');const label=node('label','Month (UTC)');const month=node('input');month.type='month';month.value=calendarMonth;month.onchange=()=>{if(/^\d{4}-\d{2}$/.test(month.value)){calendarMonth=month.value;load().catch(error);}};label.append(month);toolbar.append(label,node('p','Scheduled appointments · Times shown in UTC'));$('records').append(toolbar);
  const scroll=node('div',undefined,'calendar-scroll'),grid=node('div',undefined,'calendar-grid');for(const day of ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'])grid.append(node('div',day,'calendar-heading'));
  const start=new Date(calendarMonth+'-01T00:00:00Z'),year=start.getUTCFullYear(),monthIndex=start.getUTCMonth();const padding=(start.getUTCDay()+6)%7;for(let n=0;n<padding;n++)grid.append(node('div',undefined,'calendar-empty'));
  const days=new Date(Date.UTC(year,monthIndex+1,0)).getUTCDate();for(let day=1;day<=days;day++){
    const cell=node('div',undefined,'calendar-day');cell.append(node('strong',day));const key=calendarMonth+'-'+String(day).padStart(2,'0');const dayStart=Date.parse(key+'T00:00:00Z');
    for(const record of items.filter(r=>Date.parse(r.scheduledAt)<dayStart+86400000&&Date.parse(r.scheduledAt)+(r.durationMinutes||60)*60000>dayStart)){
      const button=node('button',new Date(record.scheduledAt).toISOString().slice(11,16)+' · '+record.name,'calendar-event');button.title=(record.assignedTo||'Unassigned')+' · '+(record.durationMinutes||60)+' min';button.onclick=()=>{view='consultations';page=1;resetFilters();load().then(()=>edit(record)).catch(error);};cell.append(button);
    }grid.append(cell);
  }scroll.append(grid);$('records').append(scroll);if(!items.length)$('records').append(node('p','No scheduled consultations this month.'));
}
function addImageUpload(){
  const wrapper=node('div',undefined,'upload-field'),label=node('label','Upload blog image (JPEG, PNG or WebP, up to 5 MB)');const input=node('input');input.type='file';input.accept='image/jpeg,image/png,image/webp';label.append(input);const button=node('button','Upload image');button.type='button';const feedback=node('p');feedback.setAttribute('role','status');wrapper.append(label,button,feedback);$('fields').append(wrapper);
  button.onclick=async()=>{const file=input.files[0];if(!file){feedback.textContent='Choose an image first.';return;}if(file.size>5*1024*1024){feedback.textContent='Maximum file size is 5 MB.';return;}const form=$('editForm'),save=form.querySelector('button.primary');const editing=current?.id||'new';button.disabled=true;save.disabled=true;feedback.textContent='Uploading…';try{const response=await fetch('/api/admin/uploads',{method:'POST',headers:{'Content-Type':file.type,'X-BBA-Admin':'1'},body:file});const result=await response.json().catch(()=>({error:'Upload failed'}));if(!response.ok)throw new Error(result.error||'Upload failed');if((current?.id||'new')!==editing||!$('editor').open)return;form.elements.namedItem('image').value=result.url;feedback.textContent='Uploaded. Save the post to use this image.';}catch(e){feedback.textContent=e.message;}finally{button.disabled=false;save.disabled=false;}};
}
$('previewPost').onclick=()=>{
  const data=Object.fromEntries(new FormData($('editForm')));$('previewContent').replaceChildren(node('p','Unpublished preview · '+data.topic,'muted'),node('h1',data.title||'Untitled'),node('p',data.excerpt));
  if(/^\/(stock|media)\/[a-zA-Z0-9_.-]+$/.test(data.image)){const img=node('img');img.src=data.image;img.alt=data.imageAlt||'';img.className='preview-image';$('previewContent').append(img);}
  for(const paragraph of data.paragraphs.split(/\n\s*\n/).filter(Boolean))$('previewContent').append(node('p',paragraph));$('preview').showModal();
};
$('closePreview').onclick=()=>$('preview').close();
// Start after both deferred scripts have registered their UI helpers.
api('me').then(signedIn).catch(e=>{if(e.message!=='Sign in required')error(e);});
