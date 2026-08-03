// HealthMate — the one complete, locked case study.
// See ./index.js for the shared schema. Facts, metrics and achievements here
// are locked; only the writing has been refined.

export const healthmate = {
  slug: 'healthmate',
  title: 'HealthMate',
  subtitle: 'An assistant a patient could actually trust between visits.',
  kicker:
    'Applied AI · Medical imaging + voice assistant · 1st prize, COMSATS Career Expo 2025',
  featured: true,
  status: 'published',
  icon: 'health',
  cardTag: 'Medical AI',
  cardTagline:
    'A two-part medical assistant — five-organ scan segmentation and a bilingual voice-to-voice companion — shaped with clinical input.',
  metrics: [
    { value: '5', label: 'Medical AI models' },
    { value: 'Voice + Vision', label: 'Multimodal AI' },
    { value: '1st', label: 'COMSATS Expo 2025' },
  ],

  // THE QUESTION
  question:
    "Most patients leave an appointment with more questions than answers — a scan they can't read, a diagnosis they half-understand, and no easy way to follow up. HealthMate started as a question, not a feature list: what would it take to build an assistant a patient could trust between visits?",

  // MY ROLE — contribution honesty; rendered as a distinct fact box.
  role: 'HealthMate was a two-person build with Zainab. The five segmentation models and the FastAPI backend and its routing were mine end to end; the voice-to-voice pipeline we built together. Zainab built the React Native frontend and the customizable 3D avatar. Everything credited below reflects that split honestly.',
  ownership: [
    {
      who: 'Mine',
      items: ['Five segmentation models', 'FastAPI backend & routing'],
    },
    {
      who: 'Shared',
      items: ['Voice-to-voice pipeline'],
    },
    {
      who: 'Zainab',
      items: ['React Native frontend', 'Customizable 3D avatar'],
    },
  ],

  sections: [
    {
      // FIELD NOTES
      label: 'Field Notes',
      blocks: [
        {
          lead: 'Grounded the design in a clinician’s workflow.',
          text: "Before writing a single prompt, we sat with the Deputy Director of Federal General Hospital to pressure-test our assumptions — and it reshaped the product. Instead of prompting the assistant to vaguely “act like a doctor,” we structured its follow-up questions around OPQRST (Onset, Provocation, Quality, Radiation, Severity, Time), the framework clinicians use for triage. It asks the way a real intake would, and defers to “see a doctor” rather than issuing a diagnosis.",
        },
        {
          lead: 'Hit the limits of patient data on purpose.',
          text: "We raised data privacy directly with the health ministry, asking how HealthMate might fit alongside the national one-patient-one-ID system. The answer was clear: as a student project, we couldn't be granted real patient data or integrate with government infrastructure — governance put that out of scope. Finding that ceiling ourselves taught us more about responsible health tech than any feature could have.",
        },
      ],
    },
    {
      // THE EXPERIMENT — architecture + the routing decision
      label: 'The Experiment',
      blocks: [
        {
          text: 'HealthMate runs two unrelated jobs through one FastAPI core. A scan is uploaded into a specific organ section — brain, liver, kidney, breast, or pancreas — and that choice tells the backend which of five segmentation models to run. Separately, a spoken question is transcribed by Whisper, reasoned over by a GPT-4.1 prompt built around OPQRST, and spoken back through the avatar. One core, two clean paths.',
        },
        {
          lead: 'The key decision — let the UI carry the routing.',
          text: 'Because the user picks the organ section, the backend never has to guess which organ a scan shows. That removed an entire organ-detection classifier — nothing extra to train, host, or get wrong. The interface encodes the routing signal for free, and the routing layer only has to tell an imaging request apart from a chat turn.',
        },
      ],
      diagram: 'requestFlow', // renders the SVG request-flow diagram
    },
    {
      // THE MODELS — rendered via the dedicated models block below
      label: 'The Models',
      blocks: [
        {
          text: 'Five organs, several architectures, all evaluated on Dice / IoU. In segmentation the background fills most of the frame, so pixel accuracy runs misleadingly high (99%+); Dice and IoU measure whether the model actually found the structure.',
        },
      ],
    },
    {
      // THE CHALLENGE
      label: 'The Challenge',
      blocks: [
        {
          lead: 'Routing two workloads that share nothing.',
          text: 'A segmentation model and a conversational LLM have nothing in common at runtime. Putting both behind one FastAPI core kept the system simple to reason about, but that simplicity lived or died on the routing boundary — it had to be explicit about what was an imaging request and what was a chat turn.',
        },
        {
          lead: 'A frontend pivot that rebuilt my mental model of the backend.',
          text: "Flutter couldn't support our 3D avatar and its TTS plugin fell short, so we moved to React Native Expo. On the day we committed, Zainab and I stripped the frontend back in the university's NCAI lab — and doing that forced me to finally trace my own backend end to end: router → services → database. We cleaned it up together and rebuilt the frontend fresh. That's where I learned to understand and decide a system's core before building on top of it.",
        },
        {
          lead: 'Tuning for a second opinion, not a verdict.',
          text: 'Clinical feedback pushed every scan result and chat reply toward hedged, triage-style language — pointing patients toward a doctor rather than standing in for one.',
        },
      ],
    },
    {
      // IMPACT
      label: 'Impact',
      blocks: [
        {
          text: 'A working two-part assistant — five-organ scan segmentation and a bilingual voice-to-voice companion — validated with clinical input and awarded 1st prize at the COMSATS Career Expo 2025. We shipped English first, then added Urdu specifically for patients in Pakistani government hospitals: shaped for the people who would actually use it, not a demo audience.',
        },
      ],
    },
  ],

  // Rendered as a card grid with Dice/IoU as the largest text.
  models: [
    {
      organ: 'Kidney tumor',
      arch: 'ResUNet, residual connections · 210 train / 90 test',
      metric: 'Dice 0.89',
    },
    {
      organ: 'Pancreas',
      arch: 'EfficientNet-B0 encoder + U-Net decoder · BCE + Focal Tversky · NIH, 512×512',
      metric: 'Dice 0.83',
      note: 'pancreas is among the hardest organs to segment',
    },
    {
      organ: 'Breast ultrasound',
      arch: '3-class (normal / benign / malignant) · 780 images, 600 patients',
      metric: 'mean IoU 84.0%',
    },
    {
      organ: 'Brain tumor',
      arch: 'Multi-modal glioma (Native, T1ce, T2, FLAIR)',
      metric: 'mean IoU 84.3%',
      note: 'Dice 0.70',
    },
    {
      organ: 'Liver',
      arch: 'ResNet-50 based · 130 CT scans',
      metric: 'FG acc. 96%',
      note: 'only metric available',
    },
  ],

  // LESSON LEARNED — signature line, kept verbatim.
  lesson:
    'The hospital visit taught me where a system should stay quiet and defer. The frontend pivot taught me the other half: understand the core before you build on it. Both are why I now start from the backbone — the model sits on top, but the backend is what holds an application up.',

  // Not publicly deployed by design (paid GPT-4.1 key, mobile app, patient-data
  // governance). "Live link" = demo video + public repos + technical report.
  links: [
    {
      label: 'Demo video',
      url: 'https://drive.google.com/file/d/1K7oD6kqqQVIakeE51ItcLXdG2qVk5piU/view?usp=drive_link',
    },
    {
      label: 'HealthMate app (GitHub)',
      url: 'https://github.com/zaenbrz/Health-Mate',
    },
    {
      label: 'Segmentation models (GitHub)',
      url: 'https://github.com/missLaiba22/Segmentation-Models-HealthMate-',
    },
    {
      label: 'Technical report',
      url: 'https://drive.google.com/file/d/1J9QgZNgEg7lzYpNpwNxhMybRljr1Ypvv/view?usp=drive_link',
    },
  ],
}