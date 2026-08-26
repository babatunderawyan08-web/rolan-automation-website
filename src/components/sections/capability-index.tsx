const CAPABILITIES = [
  {
    name: "Websites",
    note: "Designed sites for a specific offer — pages, type, and structure that belong to one business, not a swapped-out template.",
  },
  {
    name: "Web applications",
    note: "Interactive tools people actually use — dashboards, search, saved state, accounts, and flows that continue beyond the first click.",
  },
  {
    name: "Digital products",
    note: "Complete product experiences with coherent navigation, states, workflows, and a clear product point of view — so the interface feels like software, not a brochure.",
  },
  {
    name: "SaaS-style platforms",
    note: "Repeat-use, multi-user systems with accounts, roles, dashboards, data, and workflows that people return to regularly. Think marketplace, workspace, portal, or operational platform.",
  },
  {
    name: "AI integrations",
    note: "Practical AI built inside the product or workflow when it removes a real step — assistants, generation, classification, search, or intelligent actions. Not just a chatbot floating on the side of a website.",
  },
  {
    name: "Automation systems",
    note: "Connected workflows that handle notifications, handoffs, follow-up, integrations, and repetitive operational tasks as part of the overall system.",
  },
] as const;

export function CapabilityIndex() {
  return (
    <section className="border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-20 md:py-24">
        <div className="grid gap-6 border-b border-border pb-10 sm:gap-8 lg:grid-cols-12 lg:pb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted lg:col-span-4">
            Capability
          </p>
          <div className="lg:col-span-8">
            <h2 className="max-w-[18ch] font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">
              What I can take from a concept to a working experience.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              These are capabilities, not six products and not a menu of packages. The work is to build the right kind of digital thing for the problem in front of me.
            </p>
          </div>
        </div>

        <ol className="mt-2">
          {CAPABILITIES.map((item, index) => (
            <li
              key={item.name}
              className="relative border-b border-border py-6 last:border-b-0 sm:py-7 md:py-8"
            >
              <div className="grid gap-2.5 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-x-4 sm:gap-y-2 md:grid-cols-[3rem_minmax(10.5rem,0.4fr)_minmax(0,1fr)] md:items-start md:gap-x-7 lg:gap-x-10">
                <span className="font-heading text-sm tabular-nums tracking-[0.14em] text-muted md:pt-0.5">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-heading text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-[1.65rem] lg:text-[1.75rem]">
                  {item.name}
                </h3>

                <p className="max-w-xl text-[15px] leading-relaxed text-muted sm:col-span-2 sm:max-w-none md:col-span-1 md:col-start-3 md:row-start-1 md:max-w-none md:pt-0.5 md:text-base">
                  {item.note}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted sm:mt-12 sm:text-[15px]">
          AI and automation show up inside a website or application when they add value. They are not the offering, and they are not the identity of the work.
        </p>
      </div>
    </section>
  );
}
