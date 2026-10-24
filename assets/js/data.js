/* Single place to edit facts that change as the business grows.
   Nothing here is invented — empty values mean "not confirmed yet" and the site
   handles that honestly. */
window.NCORE_CONFIG = {
  // Contact email used by the quote form. Leave "" until you choose one.
  // While empty, the form tells visitors it cannot send, and offers "copy message".
  contactEmail: "",

  // Optional: paste a Formspree / Web3Forms / similar endpoint URL here later.
  // While empty, the form does NOT submit anywhere.
  formEndpoint: "",

  // Logo file names. Drop your files into /assets/logos/ using these base names.
  // The site tries each extension in order (svg, png, webp, jpg).
  logoExtensions: ["svg", "png", "webp", "jpg"],

  // Core Dynamics demo projects. Add real ones here — each renders as a card.
  // type: "demo" (your own sample/concept work) or "client" (paid client work).
  // Leave the array empty to show clearly-labelled "coming soon" slots.
  demoProjects: [
    // {
    //   title: "Café demo site",
    //   type: "demo",
    //   description: "One-line description of what you built.",
    //   url: "https://example.com",
    //   tags: ["Café", "Static site"]
    // }
  ],

  // Services. status: "offered" (you confirm it) or "planned".
  // Only mark "offered" for what you can actually deliver today.
  services: [
    { title: "Business & small-business websites", text: "Clear, fast, mobile-friendly sites that explain what you do and make it easy to get in touch.", status: "offered" },
    { title: "Café & restaurant websites", text: "Menus, location, hours and a welcoming look, built to work well on phones.", status: "offered" },
    { title: "Landing pages", text: "Focused single pages for a launch, campaign, event or product.", status: "offered" },
    { title: "Portfolio websites", text: "A clean showcase for freelancers, creators and professionals.", status: "offered" },
    { title: "Website redesigns", text: "Refresh an outdated site: better structure, design and speed.", status: "offered" },
    { title: "Domain & hosting setup help", text: "Guidance connecting a domain and getting your site live on suitable hosting.", status: "offered" },
    { title: "Maintenance plans", text: "Ongoing updates and support. Scope and terms are still being defined.", status: "planned" }
  ]
};
