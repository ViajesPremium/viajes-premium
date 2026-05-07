export type GTMGenerateLeadEvent = {
  event: "generate_lead";
  destination: string;
  form_id: string;
  method: "web-form";
};

function resolveDestinationFromPath(pathname: string): string {
  const slug = pathname.split("/").filter(Boolean)[0] ?? "home";
  return slug.replace(/-premium$/i, "");
}

export function pushGenerateLeadEvent(params: {
  pathname: string;
  formId: string;
}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  const payload: GTMGenerateLeadEvent = {
    event: "generate_lead",
    destination: resolveDestinationFromPath(params.pathname),
    form_id: params.formId,
    method: "web-form",
  };

  window.dataLayer.push(payload);
}

