import { formConsent, engagementNotice } from "@/data/editorial";

export default function EnquiryNotice() {
  return <div className="enquiry-notice"><p>{formConsent}</p><p>{engagementNotice}</p></div>;
}
