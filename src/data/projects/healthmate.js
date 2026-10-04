// HealthMate — the one complete, locked case study.
// See ./index.js for the shared schema. Facts, metrics and achievements here
// are locked; only the writing has been refined (plain, results-first).

export const healthmate = {
  slug: 'healthmate',
  title: 'HealthMate',
  subtitle:
    'A medical assistant that reads scans for five organs and answers patient questions by voice, in English and Urdu.',
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
    "Patients often leave an appointment with a scan they can't read and questions they didn't get to ask. HealthMate helps between visits: it segments medical scans and answers follow-up questions by voice, while always pointing patients back to a doctor for a diagnosis.",

  // MY ROLE — contribution honesty; rendered as a distinct fact box.
  role: 'HealthMate was a two-person build with Zainab. I built the five segmentation models and the FastAPI backend and its routing. We built the voice-to-voice pipeline together. Zainab built the React Native frontend and the customizable 3D avatar.',
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
      label: 'Clinical input',
      blocks: [
        {
          lead: 'Designed the assistant around how clinicians do triage.',
          text: 'We met the Deputy Director of Federal General Hospital to test our assumptions. Based on that meeting, we structured the follow-up questions around OPQRST (Onset, Provocation, Quality, Radiation, Severity, Time), the framework clinicians use for triage. The assistant asks questions the way a real intake would, and tells the patient to see a doctor instead of giving a diagnosis.',
        },
        {
          lead: 'Checked what was possible with real patient data.',
          text: "We asked the health ministry whether HealthMate could connect to the national one-patient-one-ID system. As a student project, we couldn't get access to real patient data or government systems, so that integration was out of scope. It showed us early how much data governance shapes a health product.",
        },
      ],
    },
    {
      label: 'How it works',
      blocks: [
        {
          text: 'One FastAPI backend handles two separate jobs. For imaging, the user uploads a scan into an organ section (brain, liver, kidney, breast or pancreas), and the backend runs the matching segmentation model. For conversation, Whisper transcribes the spoken question, a GPT-4.1 prompt built around OPQRST writes the reply, and the avatar speaks it back.',
        },
        {
          lead: 'Key decision: let the UI choose the model.',
          text: "Because the user picks the organ section, the backend never has to detect which organ a scan shows. This removed the need for a separate organ-detection model, so there was one less model to train, host and get wrong. The routing layer only has to tell an imaging request apart from a chat message.",
        },
      ],
      diagram: 'requestFlow', // renders the SVG request-flow diagram
    },
    {
      label: 'Model results',
      models: true, // renders the models card grid below
      blocks: [
        {
          text: 'Five organs, several architectures, all evaluated with Dice / IoU. In segmentation the background fills most of the image, so pixel accuracy is misleadingly high (99%+). Dice and IoU show whether the model actually found the structure.',
        },
      ],
    },
    {
      label: 'Challenges & fixes',
      blocks: [
        {
          lead: 'Two very different workloads in one backend.',
          text: 'A segmentation model and a conversational LLM share nothing at runtime. I kept both behind one FastAPI backend to keep the system simple, and made the routing explicit: every request is clearly either an imaging request or a chat message.',
        },
        {
          lead: 'Switching the frontend from Flutter to React Native.',
          text: "Flutter couldn't support our 3D avatar, and its text-to-speech plugin wasn't good enough, so we moved to React Native Expo. While Zainab and I rebuilt the frontend in the university's NCAI lab, I traced my backend end to end (router → services → database) and cleaned it up. Since then, I make sure I understand a system's core before building on top of it.",
        },
        {
          lead: 'Keeping answers safe.',
          text: 'Following clinical feedback, every scan result and chat reply uses careful, triage-style language and points the patient to a doctor rather than replacing one.',
        },
      ],
    },
    {
      label: 'Results',
      bullets: [
        '1st prize at the COMSATS Career Expo 2025.',
        'Five organ segmentation models: kidney Dice 0.89, pancreas Dice 0.83, breast mean IoU 84.0%, brain mean IoU 84.3%.',
        'Voice assistant in English, with Urdu added for patients in Pakistani government hospitals.',
        'Follow-up questions structured with clinical input around the OPQRST triage framework.',
        'Organ chosen in the UI, so no extra organ-detection model was needed.',
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

  // LESSON LEARNED
  lesson:
    'The hospital visit taught me when an AI system should hold back and refer to a doctor. The frontend switch taught me to understand the backend before building on it. I now start every project from the backend, because that is what holds the application together.',

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
