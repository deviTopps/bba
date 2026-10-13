const $ = id => document.getElementById(id);
let view='enquiries', page=1, total=0, current=null, generation=0, user=null;
async function api(path, method='GET', body) {
  const response=await fetch('/api/admin/'+path,{method,headers:{'Content-Type':'application/json','X-BBA-Admin':'1'},body:body?JSON.stringify(body):undefined});
  const result=await response.json().catch(()=>({error:response.status===429?'Too many requests. Please try again later.':'Service unavailable'}));
  if(!response.ok){if(response.status===401){document.body.classList.add('login-view');$('editor').close();$('login').hidden=false;$('workspace').hidden=true;$('logout').hidden=true;}throw new Error(result.error||'Request failed');}return result;
}
function node(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function error(e){$('message').textContent=e.message;if(document.body.classList.contains('login-view'))$('login-feedback').textContent=e.message;}
async function load(){
  const sequence=++generation;
  const extra=['account','staff','activity','calendar'].includes(view);
  $('metrics').hidden=extra;$('filters').hidden=extra;$('searchForm').hidden=extra;$('pagination').hidden=extra;$('create').hidden=true;
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  if(extra){await loadFeatureView(sequence);return;}
  $('message').textContent='Loading…';
  const [summary,list]=await Promise.all([api('summary'),api(view+'?page='+page+'&'+listQuery())]);
  if(sequence!==generation)return;
  $('message').textContent='';$('heading').textContent={enquiries:'Enquiries',posts:'Blog posts',consultations:'Consultations'}[view];
  $('metrics').replaceChildren(...Object.entries(summary).map(([label,value])=>{const el=node('article',label[0].toUpperCase()+label.slice(1));el.append(node('strong',value));return el;}));
  $('create').hidden=view==='enquiries';$('create').textContent=view==='posts'?'Create post':'Add consultation';
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  total=list.total;$('page').textContent='Page '+page+' · '+total+' records';$('previous').disabled=page<=1;$('next').disabled=page*25>=total;
  $('records').replaceChildren();if(!list.items.length)$('records').append(node('p','No records found.'));
  for(const record of list.items){const row=node('div',undefined,'row'),copy=node('div');copy.append(node('strong',record.title||record.name),node('p',record.excerpt||record.service),node('span',record.status,'badge'));if(record.followUpAt)copy.append(node('p','Follow up: '+new Date(record.followUpAt).toUTCString(),Date.parse(record.followUpAt)<Date.now()&&record.status!=='closed'?'overdue':''));if(record.scheduledAt)copy.append(node('p','Appointment: '+new Date(record.scheduledAt).toUTCString()));const button=node('button','Manage');button.onclick=()=>edit(record);row.append(copy,button);$('records').append(row);}
}
function field(name,label,value='',type='text',options){const wrapper=node('label',label);let input;if(options){input=node('select');options.forEach(v=>{const option=node('option',v);option.value=v;input.append(option);});}else input=node(type==='textarea'?'textarea':'input');if(input.tagName==='INPUT')input.type=type;input.name=name;input.value=value; if(type==='textarea')input.rows=6;wrapper.append(input);$('fields').append(wrapper);return input;}
function edit(record){
  current=record;$('fields').replaceChildren();$('editorMessage').textContent='';$('editorTitle').textContent=record?'Manage '+(record.title||record.name):'New '+(view==='posts'?'post':'consultation');$('delete').hidden=view!=='posts'||!record;
  $('previewPost').hidden=view!=='posts';$('recordHistory').replaceChildren();
  if(view==='posts'){
    field('title','Title',record?.title).required=true;field('slug','URL slug',record?.slug).required=true;field('excerpt','Excerpt',record?.excerpt,'textarea').required=true;
    field('topic','Topic',record?.topic||'audit','text',['audit','tax','advisory','public-sector','technology','data','sustainability']);
    field('image','Image path',record?.image||'/stock/about-hero.jpg');addImageUpload();field('imageAlt','Image description',record?.imageAlt);
    field('paragraphs','Article text (separate paragraphs with a blank line)',record?.paragraphs?.join('\n\n'),'textarea').required=true;
    field('status','Publication status',record?.status||'draft','text',['draft','published']);field('publishedAt','Publication time (UTC)',new Date(record?.publishedAt||Date.now()).toISOString().slice(0,16),'datetime-local').required=true;
  }else{
    if(record){$('fields').append(node('pre',[record.name,record.email,record.organisation,record.service,...record.subservices||[],record.message,...(record.questionnaire||[]).map(q=>q.id+': '+q.question+'\n'+q.answer)].filter(Boolean).join('\n\n')));}else{field('name','Client name').required=true;field('email','Client email','','email').required=true;field('organisation','Organisation');consultationServiceField();field('message','Requirements','','textarea').required=true;}
    field('status','Status',record?.status||(view==='enquiries'?'new':'requested'),'text',view==='enquiries'?['new','reviewing','awaiting-client','closed']:['requested','scheduled','completed','cancelled']);
    field('assignedTo','Assigned staff email',record?.assignedTo,'email');field('notes','Internal notes',record?.notes,'textarea');
    if(view==='enquiries')field('followUpAt','Follow-up time (UTC)',record?.followUpAt?new Date(record.followUpAt).toISOString().slice(0,16):'','datetime-local');
    if(view==='consultations'){field('scheduledAt','Appointment time (UTC)',record?.scheduledAt?new Date(record.scheduledAt).toISOString().slice(0,16):'','datetime-local');const duration=field('durationMinutes','Duration in minutes',record?.durationMinutes||60,'number');duration.min=15;duration.max=480;duration.required=true;}
  }
  $('editor').showModal();
  if(record)showRecordHistory(view,record.id);
}
$('editForm').onsubmit=async event=>{event.preventDefault();const button=event.submitter;button.disabled=true;try{const formData=new FormData(event.target);const data=Object.fromEntries(formData);if(view==='consultations'&&!current)data.subservices=formData.getAll('subservices');if(view==='posts'){data.paragraphs=data.paragraphs.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean);data.publishedAt=new Date(data.publishedAt+'Z').toISOString();}for(const name of ['scheduledAt','followUpAt'])if(data[name])data[name]=new Date(data[name]+'Z').toISOString();if(view==='consultations')data.durationMinutes=Number(data.durationMinutes);await api(view+(current?'/'+current.id:''),current?'PATCH':'POST',data);$('editor').close();await load();}catch(e){$('editorMessage').textContent=e.message;}finally{button.disabled=false;}};
$('delete').onclick=async()=>{if(!confirm('Permanently delete this blog post?'))return;try{await api('posts/'+current.id,'DELETE');$('editor').close();await load();}catch(e){$('editorMessage').textContent=e.message;}};
$('close').onclick=()=>$('editor').close();$('create').onclick=()=>edit(null);
async function signedIn(account){user=account;configureAccess();document.body.classList.remove('login-view');$('login').hidden=true;$('workspace').hidden=false;$('logout').hidden=false;$('identity').textContent=user.email;$('account-role').textContent=user.role[0].toUpperCase()+user.role.slice(1);$('account-avatar').textContent=user.email.slice(0,2).toUpperCase();resetFilters();await load();}
$('header-account').onclick=()=>{view='account';page=1;resetFilters();load().catch(error);};
$('toggle-password').onclick=()=>{const input=$('login-password');const show=input.type==='password';input.type=show?'text':'password';$('toggle-password').textContent=show?'Hide':'Show';$('toggle-password').setAttribute('aria-label',show?'Hide password':'Show password');$('toggle-password').setAttribute('aria-pressed',String(show));};
$('loginForm').onsubmit=async event=>{event.preventDefault();const button=event.submitter;button.disabled=true;button.querySelector('span').textContent='Signing in…';$('login-feedback').textContent='';try{await signedIn(await api('login','POST',Object.fromEntries(new FormData(event.target))));event.target.reset();$('login-password').type='password';$('toggle-password').textContent='Show';$('toggle-password').setAttribute('aria-pressed','false');$('toggle-password').setAttribute('aria-label','Show password');}catch(e){error(e);}finally{button.disabled=false;button.querySelector('span').textContent='Sign in';}};
$('logout').onclick=async()=>{try{await api('logout','POST',{});location.reload();}catch(e){error(e);}};
document.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>{view=button.dataset.view;page=1;$('search').value='';resetFilters();if(!$('workspace').hidden)load().catch(error);});
$('searchForm').onsubmit=e=>{e.preventDefault();page=1;load().catch(error);};$('refresh').onclick=()=>load().catch(error);
$('previous').onclick=()=>{page--;load().catch(error);};$('next').onclick=()=>{page++;load().catch(error);};
