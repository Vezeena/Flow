// emergency kit image source: https://www.pexels.com/photo/first-aid-and-surival-kits-5125690/
import emergencyKitImage from "../../assets/topics/emergencyKit.png";
// evacuation image source: https://www.pexels.com/photo/woman-carrying-yellow-firefighter-helmet-17824760/
import evacuationImage from "../../assets/topics/evacuation.png";
// first-aid image source: https://unsplash.com/photos/orange-white-and-black-bag-MaKsx8JNbiI
import firstAidImage from "../../assets/topics/firstAid.png";
// flood image source: https://www.pexels.com/photo/emergency-flood-response-team-at-urban-neighborhood-28447788/
import floodPreparednessImage from "../../assets/topics/floodPreparedness.png";
// plan image source: www.pexels.com/photo/a-family-in-the-dining-table-8121113/
import householdPlanImage from "../../assets/topics/householdPlan.png";

/**
 * Learning topics Each topic defines its metadata, educational content, quiz questions, and a
 * practical checklist that users complete after the learning.
 *
 * @type {{
 *   id: string;
 *   title: string;
 *   icon: string;
 *   image: number;
 *   learningContent: string[];
 *   quiz: { question: string; options: string[]; correctAnswerIndex: number; feedback: string }[];
 *   checklist: string[];
 * }[]}
 */
export const topics = [
  // ==================== FLOOD PREPAREDNESS ====================
  // Information sourced from: https://www.redcross.org.uk/get-help/prepare-for-emergencies/how-to-prepare-for-floods-and-flooding
  {
    id: "flood-preparedness",
    title: "Flood Preparedness",
    icon: "water-outline",
    image: floodPreparednessImage,
    // learning content shown before the quiz, each element is a paragraph
    learningContent: [
      "Flooding is one of the most common disasters we have in the UK, and flash floods happen fast, even in areas that are not usually at risk. Check if your area is at risk, and sign up for government flood warnings to get the earliest alert you can.",
      "Save time by being prepared; make an evacuation plan, put together your emergency kit and grab bag, and check whether your home insurance covers flood damage. If you live in a high risk area, talk to your neighbours to make sure you’re all aware. If you need extra assistance with your electricity or gas, let your supplier know and be added to their priority support register.",
      "When you receive a flood alert, you should move all important documents and sentimental items to higher ground, along with any vehicles if possible. If there’s time, photograph your home in case you need to claim on your insurance. Follow the official advice and never enter floodwater as it can be unexpectedly fast, deep, and contaminated.",
    ],
    // quiz based on prior learning content
    quiz: [
      {
        question: "Why should you sign up for government flood warnings?",
        options: [
          "It's a legal requirement",
          "To lower your insurance rates",
          "It's the only way to know if there's a flood in your area",
          "To get as much notice as possible before a flood",
        ],
        correctAnswerIndex: 3,
        feedback:
          "Flood warnings and other alerts give you as much advance notice as possible, giving you extra time to prepare or evacuate.",
      },
      {
        question: "Does flooding only happen in high risk areas?",
        options: ["Yes", "No, flash floods can happen anywhere", "High risk areas and near rivers"],
        correctAnswerIndex: 1,
        feedback:
          "Flash floods are unpredictable, and can affect areas that do not usually flood. They can happen quickly and take you by surprise.",
      },
      {
        question: "After an alert is issued, should you move your vehicle?",
        options: [
          "Yes, to higher ground",
          "No",
          "Yes, but only if there will be a lot of water",
          "Maybe, it depends on the situation",
        ],
        correctAnswerIndex: 0,
        feedback:
          "Moving vehicles (and other important items) to higher ground can project them from getting damaged by the rising water.",
      },
      {
        question: "What are the photographs of your home for?",
        options: [
          "To share on social media",
          "It's required by the council in order to help you",
          "To help with insurance claims",
          "So you have a memory of your home",
        ],
        correctAnswerIndex: 2,
        feedback:
          "Photographs can help show the contents of your home, supporting your insurance claim after a flood.",
      },
      {
        question: "How should you cross floodwater?",
        options: [
          "On foot if it's shallow enough",
          "Wading if it's below the knee",
          "By bicycle",
          "By car",
          "Never cross floodwater",
        ],
        correctAnswerIndex: 4,
        feedback:
          "Never enter floodwater. It can be deep, fast, and contaminated. It is dangerous.",
      },
    ],
    checklist: [
      "Check if your area is at risk",
      "Familiarise yourself with the government flood warnings",
      "Make an evacuation plan and prepare an emergency kit",
      "Check whether your home insurance covers flood damage",
      "Tell your gas and electricity suppliers if you need extra support",
      "Talk to your neighbours about flooding",
    ],
  },
  // ==================== FIRST AID ====================
  // Information sourced from: https://www.redcross.org.uk/first-aid/learn-first-aid
  // and https://www.redcross.org.uk/get-help/prepare-for-emergencies/prepare-an-emergency-kit
  // and https://prepare.campaign.gov.uk/get-prepared-for-emergencies/
  {
    id: "first-aid",
    title: "First Aid Basics",
    icon: "medkit-outline",
    image: firstAidImage,
    learningContent: [
      "Only 4 in 10 people in the UK feel confident helping out in a first aid emergency, but it could make all the difference. The best way you can prepare is by taking a proper first aid course. The British Red Cross offers training and a free first aid app. St John Ambulance also offers training, and web based learning resources.",
      "Before helping others, check your surroundings for your own safety. Look for dangers such as floodwater, traffic, or fires, and only help when you are confident you will be safe doing so. You don’t want to add a second casualty.",
      "In an emergency, first call 999 for an ambulance. If someone is unresponsive, not breathing normally, or bleeding heavily, 999 is the first priority, and the operator will be able to guide you until further help arrives. For non-emergent help, call the NHS’s 111.",
      "Make sure you have a first aid kit at home and everyone in your household knows its location. A basic kit includes scissors, safety pins, waterproof plasters, sterile dressings and bandages, antiseptic, disposable gloves, eyewash solution, medical tape, tweezers, and a thermometer. The British Red Cross sells a basic first aid kit on their website, which you can further add to. Check it around once a year to ensure nothing is missing or out of date.",
    ],
    quiz: [
      {
        question: "Before helping someone else, what should you check?",
        options: [
          "That it is safe to do so",
          "Whether they are responsive",
          "How old they are",
          "Whether they are breathing normally",
        ],
        correctAnswerIndex: 0,
        feedback:
          "Always check your surroundings are safe first to ensure you don't become a casualty as well.",
      },
      {
        question: "If someone is unresponsive, what should you do?",
        options: [
          "Wait and see if they improve",
          "Give them some water",
          "Shake them awake",
          "Call 999",
        ],
        correctAnswerIndex: 3,
        feedback:
          "Call 999 immediately and the operator will guide you until the ambulance arrives.",
      },
      {
        question: "What's the best way to prepare yourself to give first aid?",
        options: [
          "Read about it once or twice",
          "Go and look for people to practise on",
          "Take a proper first aid course",
          "Ensuring your phone has battery to call 999",
        ],
        correctAnswerIndex: 2,
        feedback:
          "An in person course (British Red Cross) is the best way to build your confidence and skills.",
      },
      {
        question: "What is the number for non-emergent advice?",
        options: ["101", "999", "111"],
        correctAnswerIndex: 2,
        feedback: "The NHS's 111 is for non-emergent advice, and 999 is for emergencies.",
      },
      {
        question: "How often should you check your first aid kit?",
        options: ["Before using it", "No need to check it", "Every week", "Once a year"],
        correctAnswerIndex: 3,
        feedback:
          "Checking it once a year is a good way to catch out of date products or misplaced items.",
      },
    ],
    checklist: [
      "Keep a well stocked first aid kit at home ",
      "Make sure you and your household know the first aid kit's location",
      "Check the kit once a year and replace anything out of date",
      "Save emergency numbers: 999 (emergency), 111 (NHS), 105 (power cuts), as contacts if you can't remember them",
      "Consider taking a first aid course or using the free British Red Cross first aid app",
    ],
  },
  // ==================== HOUSEHOLD PLAN ====================
  // Information sourced from: https://prepare.campaign.gov.uk/
  {
    id: "household-plan",
    title: "Household Emergency Plan",
    icon: "home-outline",
    image: householdPlanImage,
    learningContent: [
      "A household’s emergency plan is important information you and your household write down in advance so you all know what to do in an emergency. In an emergency you may not have power, your phone, or the internet, so keeping a printed copy somewhere easy to access means the information is always there when you need it",
      "If the emergency is happening outside, go in, stay in, and tune in. This means close windows and doors if needed, stay inside, and follow official updates from your local news or emergency services. If the emergency is inside of your home, do the opposite: get out, stay out, and ring 999.",
      "Agree with your household on a meeting point in advance in case you need to leave your home, and make sure everyone who lives in the home knows how to turn the gas, electricity, and water off at the mains. Remember that you can turn the water and electricity back on yourself, but a qualified engineer should be the one to turn the gas back on.",
    ],
    quiz: [
      {
        question: "Why should you keep a printed copy of your emergency plan?",
        options: [
          "To show your guests",
          "So it's available when you have no power, phone, or internet",
          "It looks official",
        ],
        correctAnswerIndex: 1,
        feedback:
          "A printed copy is always accessible, even when you have no power, phone, or internet.",
      },
      {
        question: "What should you do when the emergency is OUTSIDE?",
        options: [
          "Go in, stay in, tune in",
          "Close all the windows and doors",
          "Get out, stay out, ring 999",
          "Open all the windows and doors",
        ],
        correctAnswerIndex: 0,
        feedback: "For outside emergencies: go in, stay in, and tune in to official updates.",
      },
      {
        question: "What should you do when the emergency is INSIDE?",
        options: [
          "Get out, stay out, ring 999",
          "Evacuate immediately",
          "Go in, stay in, tune in",
          "Call 999 and ask them what to do",
        ],
        correctAnswerIndex: 0,
        feedback: "For inside emergencies: get out, stay out, and ring 999.",
      },
      {
        question: "Which utility should you NOT turn back on by yourself?",
        options: ["Water", "Electricity", "Gas"],
        correctAnswerIndex: 2,
        feedback:
          "Only a qualified engineer should turn the gas back on. You may turn the water and electricity back on yourself.",
      },
      {
        question: "Why should you agree on a meeting point in advance?",
        options: [
          "To get there quicker",
          "So everyone knows where to go if you have to leave home",
          "To practise evacuating",
          "It's where your emergency kit is stored",
        ],
        correctAnswerIndex: 1,
        feedback:
          "Agreeing in advance on a meeting point means everyone knows where to regroup if you need to leave.",
      },
    ],
    checklist: [
      "Write down your household’s emergency plan and keep a printed copy",
      "Agree on a meeting point with everyone you live with",
      "Know how to turn off your water, gas, and electricity",
      "Save important numbers: 999 (emergency), 111 (NHS), 105 (power cuts)",
      "Put together basic emergency supplies (torch, power bank, water, first aid kid)",
    ],
  },
  // ==================== EMERGENCY KIT ====================
  // Information sourced from: https://www.redcross.org.uk/get-help/prepare-for-emergencies/prepare-an-emergency-kit
  // and https://prepare.campaign.gov.uk/get-prepared-for-emergencies/
  {
    id: "emergency-kit",
    title: "Emergency kit",
    icon: "briefcase-outline",
    image: emergencyKitImage,
    learningContent: [
      "Your emergency kit should contain a collection of essentials that are always ready, whether you lose power or water and have to stay home, or have to leave home quickly. Pick a box or bag and add items to them gradually, for example during your weekly supermarket shop.",
      "Your home kit (for staying at home) should include a battery or wind up torch, a power bank for your phone, a battery or wind up radio for updates during power cuts, spare batteries, bottled water, and non perishable food items with a tin opener. Add a first aid kit, hand sanitiser, and wet wipes, any essential medication, and copies of your important documents within a waterproof bag. The World Health Organisation recommends a minimum of around 3 litres of drinking water per person per day.",
      "It also helps to keep a smaller grab bag of essentials ready to take with you if you need to leave home quickly. It’s worth keeping a similar kit in your car too, including warm layers, a torch, water, and jump leads.",
    ],
    quiz: [
      {
        question: "What's the recommended way to build your emergency kit?",
        options: [
          "Buy everything at once in one shop",
          "Wait until an emergency happens to gather items",
          "Add items gradually over time",
          "Ask your neighbours for their supplies",
        ],
        correctAnswerIndex: 2,
        feedback:
          "You don't need to buy everything at once, just add items gradually when you can.",
      },
      {
        question: "Why should you keep a batter or wind up radio in your kit?",
        options: [
          "So you aren't bored",
          "To charge your phone",
          "For updates during a power cut",
          "Music helps keep you calm",
        ],
        correctAnswerIndex: 2,
        feedback: "A radio gives you updates when other devices may be down.",
      },
      {
        question: "Roughly how much drinking water is recommended per person, per day?",
        options: ["1 litre", "2 litres", "3 litres", "4 litres"],
        correctAnswerIndex: 2,
        feedback:
          "A minimum of around 3 litres of drinking water per person per day is recommended.",
      },
      {
        question: "What is a grab bag?",
        options: [
          "A smaller bag of essentials ready to take if you need to leave home quickly",
          "A bag of tools for repairing damage",
          "A bag you grab",
          "The bag your first aid kit comes in",
        ],
        correctAnswerIndex: 0,
        feedback:
          "Grab bags hold the bare essentials you can easily carry when leaving home in a hurry.",
      },
      {
        question: "Why should you keep copies of important documents in your kit?",
        options: [
          "To prove you own your kit",
          "In case you need them and can't access digital copies",
          "It's a legal requirement",
        ],
        correctAnswerIndex: 1,
        feedback:
          "Paper copies (in a waterproof bag) are always accessible, even without power or internet.",
      },
    ],
    checklist: [
      "A torch (battery powered or wind up) and spare batteries if needed",
      "A radio (battery powered or wind up) and spare batteries if needed",
      "A power bank for your phone and radio",
      "Bottled water (3L per person per day)",
      "Non perishable food and a tin opener",
      "First aid kit with hand sanitiser and wet wipes",
      "Essential medication",
      "Waterproof bag with copies of important documents",
      "Grab bag with the essentials",
    ],
  },
  // ==================== EVACUATION ====================
  // Information sourced from: https://www.redcross.org.uk/get-help/prepare-for-emergencies
  // and https://www.redcross.org.uk/get-help/prepare-for-emergencies/how-to-prepare-for-floods-and-flooding
  {
    id: "evacuation",
    title: "Evacuation Basics",
    icon: "exit-outline",
    image: evacuationImage,
    learningContent: [
      "Sometimes it won’t be safe to stay in your home, such as with heavy flooding. Be prepared and plan out your evacuation in advance. Know what you’ll need to take with you, such as pets and your grab bag - containing essential medication and important documents. Keep your grab bag ready by the main exit, and know your exit routes.",
      "Before leaving your home, turn off the main power. This is extremely important as you can be electrocuted in floodwater if the power is on. Do not leave your pets behind as they can be trapped by rising floodwater.",
      "Do not walk, swim, or drive through floodwater even if it looks harmless. Six inches (fifteen centimetres) of fast-flowing water can knock you down. Two feet (sixty centimetres) can float a car. Floodwater may be contaminated with sewage, so avoid contact with it as much as possible, and wash your hands and clothes thoroughly in clean water after.",
      "Emergency services can advise when to leave and what routes you should use in doing so. Do not return home until you are told it is safe to.",
    ],
    quiz: [
      {
        question: "Why must you turn off the main power before leaving in a flood?",
        options: [
          "To reduce your electricity bill",
          "As part of your insurance",
          "You can be electrocuted in floodwater",
        ],
        correctAnswerIndex: 2,
        feedback:
          "An electric current can be carried by the floodwater if the power is on, so turn it off first.",
      },
      {
        question: "What should you do with your pets when you evacuate?",
        options: [
          "Leave them at home with enough food and water",
          "Give them to a shelter",
          "Open the doors and let them evacuate themselves",
          "Take them with you",
        ],
        correctAnswerIndex: 3,
        feedback: "They could be trapped by rising floodwaters, so take them with you.",
      },
      {
        question: "Can you walk or drive through floodwater?",
        options: [
          "No",
          "Yes for walking and driving, if it's below 6 inches/15 centimetres",
          "Yes for driving, if it's below 2 feet/60 centimetres, no for walking",
          "Yes for both if it's going slowly",
        ],
        correctAnswerIndex: 0,
        feedback:
          "Never walk or drive through any floodwater, even if it looks safe. You can be knocked over or have your car floated.",
      },
      {
        question: "When can you return home after evacuation?",
        options: [
          "Immediately once the flooding stops",
          "When emergency services say it's safe",
          "24 hours after the flooding stops",
        ],
        correctAnswerIndex: 1,
        feedback:
          "Only return home once emergency services say it's safe to do so, there may be structural damage you are unaware of.",
      },
      {
        question: "Why should you not get floodwater on you?",
        options: [
          "It could make you smell bad",
          "It's cold",
          "It could stain your clothes",
          "It may be contaminated with sewage",
        ],
        correctAnswerIndex: 3,
        feedback:
          "Floodwater may contain sewage, so wash your hands and clothes thoroughly if exposed.",
      },
    ],
    checklist: [
      "Plan your evacuation route (with any possible backup exits) and agree a meeting point",
      "Keep your grab bag ready by the main exit (with medication and important documents)",
      "Know how you'll take your pets with you",
      "Know how to turn off the power at the mains",
    ],
  },
];
