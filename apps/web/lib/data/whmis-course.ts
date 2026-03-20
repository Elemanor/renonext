/**
 * WHMIS 2015 Course Data
 * Complete educational content for WHMIS (Workplace Hazardous Materials Information System) training
 * Aligned with Canada's implementation of the Globally Harmonized System (GHS)
 */

export interface WHMISPictogram {
  id: string;
  name: string;
  svgFile: string; // filename in /pictograms/
  meaning: string;
  examples: string[];
}

export interface WHMISSection {
  heading: string;
  paragraphs: string[];
  pictogramIds?: string[]; // references to pictogram ids
}

export interface WHMISModule {
  id: number;
  title: string;
  order: number;
  icon: string; // Material Symbols Outlined icon name
  description: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  sections: WHMISSection[];
  keyFacts: string[];
}

export interface WHMISQuestion {
  id: number;
  moduleId: number;
  question: string;
  options: string[];
  correctAnswer: number; // index into options
  explanation: string;
}

/**
 * GHS Pictograms used in WHMIS 2015
 */
export const whmisPictograms: WHMISPictogram[] = [
  {
    id: 'flame',
    name: 'Flame',
    svgFile: 'flame.svg',
    meaning: 'Flammable materials',
    examples: [
      'Gasoline and diesel fuel',
      'Acetone and other solvents',
      'Aerosol spray cans',
      'Propane and natural gas',
      'Wood dust and metal powders'
    ]
  },
  {
    id: 'flame-over-circle',
    name: 'Flame Over Circle',
    svgFile: 'flame-over-circle.svg',
    meaning: 'Oxidizing materials',
    examples: [
      'Oxygen cylinders',
      'Hydrogen peroxide solutions',
      'Calcium hypochlorite (pool chlorine)',
      'Potassium permanganate',
      'Nitric acid'
    ]
  },
  {
    id: 'gas-cylinder',
    name: 'Gas Cylinder',
    svgFile: 'gas-cylinder.svg',
    meaning: 'Gases under pressure',
    examples: [
      'Compressed air cylinders',
      'Carbon dioxide (CO2) tanks',
      'Welding gases (argon, helium)',
      'Refrigerant gases',
      'Propane cylinders'
    ]
  },
  {
    id: 'corrosion',
    name: 'Corrosion',
    svgFile: 'corrosion.svg',
    meaning: 'Corrosive materials',
    examples: [
      'Sulfuric acid (battery acid)',
      'Hydrochloric acid (muriatic acid)',
      'Sodium hydroxide (caustic soda)',
      'Drain cleaners',
      'Rust removers'
    ]
  },
  {
    id: 'exploding-bomb',
    name: 'Exploding Bomb',
    svgFile: 'exploding-bomb.svg',
    meaning: 'Explosive materials',
    examples: [
      'Fireworks and ammunition',
      'Organic peroxides',
      'Self-reactive substances',
      'Dynamite and TNT',
      'Unstable chemical mixtures'
    ]
  },
  {
    id: 'skull-crossbones',
    name: 'Skull and Crossbones',
    svgFile: 'skull-crossbones.svg',
    meaning: 'Acute toxicity (fatal or toxic)',
    examples: [
      'Cyanide compounds',
      'Arsenic compounds',
      'Strychnine',
      'High-concentration pesticides',
      'Carbon monoxide'
    ]
  },
  {
    id: 'health-hazard',
    name: 'Health Hazard',
    svgFile: 'health-hazard.svg',
    meaning: 'Serious health hazards',
    examples: [
      'Asbestos (carcinogen)',
      'Silica dust (respiratory hazard)',
      'Benzene (carcinogen)',
      'Formaldehyde (sensitizer)',
      'Lead compounds (organ toxicity)'
    ]
  },
  {
    id: 'exclamation-mark',
    name: 'Exclamation Mark',
    svgFile: 'exclamation-mark.svg',
    meaning: 'Less serious health hazards',
    examples: [
      'Ammonia solutions (irritant)',
      'Isopropyl alcohol (narcotic)',
      'Fiberglass (skin irritant)',
      'Chlorine bleach (irritant)',
      'Paint thinners (narcotic effects)'
    ]
  },
  {
    id: 'biohazard',
    name: 'Biohazardous Infectious Materials',
    svgFile: 'biohazard.svg',
    meaning: 'Materials containing organisms that pose a risk',
    examples: [
      'Medical waste and sharps',
      'Blood and body fluids',
      'Laboratory cultures',
      'Contaminated equipment',
      'Biological specimens'
    ]
  }
];

/**
 * WHMIS 2015 Training Modules
 */
export const whmisModules: WHMISModule[] = [
  {
    id: 1,
    title: 'Introduction to WHMIS 2015',
    order: 1,
    icon: 'school',
    description: 'Learn the fundamentals of WHMIS, its history, and why it is essential for workplace safety in Canada.',
    estimatedMinutes: 10,
    learningObjectives: [
      'Understand what WHMIS is and why it exists',
      'Recognize the key elements of WHMIS 2015',
      'Identify the roles and responsibilities of employers, workers, and suppliers',
      'Understand the transition from WHMIS 1988 to WHMIS 2015'
    ],
    sections: [
      {
        heading: 'What is WHMIS?',
        paragraphs: [
          'WHMIS stands for Workplace Hazardous Materials Information System. It is Canada\'s national hazard communication standard that ensures workers across the country receive consistent and comprehensive information about the hazardous materials they may be exposed to in their workplace.',
          'The system was first introduced in 1988 and has been instrumental in protecting Canadian workers from injuries and illnesses related to hazardous materials. WHMIS 2015 represents the latest evolution of this system, aligning Canada\'s requirements with the Globally Harmonized System of Classification and Labelling of Chemicals (GHS).',
          'WHMIS applies to all workplaces in Canada that are regulated under federal, provincial, or territorial health and safety legislation. This includes manufacturing facilities, construction sites, healthcare facilities, laboratories, retail establishments, and many other work environments where hazardous materials are present.',
          'The primary goal of WHMIS is to protect workers by ensuring they have the information they need to work safely with hazardous materials. This includes understanding the hazards of the materials they work with, knowing how to handle them safely, and being prepared to respond appropriately in emergency situations.'
        ]
      },
      {
        heading: 'From WHMIS 1988 to WHMIS 2015',
        paragraphs: [
          'WHMIS 1988 served Canada well for over 25 years, but as international trade expanded and chemical science advanced, the need for a globally harmonized approach became apparent. Different countries had different systems for classifying and communicating chemical hazards, which created confusion and safety risks when products crossed borders.',
          'The United Nations developed the Globally Harmonized System of Classification and Labelling of Chemicals (GHS) to address this issue. GHS provides a common framework that countries worldwide can adopt, ensuring that workers, consumers, and emergency responders receive consistent information about chemical hazards regardless of where products are manufactured or used.',
          'Canada began implementing GHS through WHMIS 2015, which was phased in between February 2015 and December 2018. The transition period allowed suppliers and employers time to update labels, safety data sheets, and training programs. As of December 1, 2018, WHMIS 2015 became fully enforceable across Canada.',
          'While WHMIS 2015 represents a significant update, many fundamental principles remain the same. The system still relies on labels, safety data sheets, and worker education. However, the classification system is more detailed, the labels have a standardized format with pictograms, and safety data sheets follow a consistent 16-section format.'
        ]
      },
      {
        heading: 'The Three Key Elements of WHMIS',
        paragraphs: [
          'WHMIS 2015 is built on three essential elements that work together to protect workers: labels, safety data sheets, and education and training. Each element plays a crucial role in the system, and all three must be in place for WHMIS to function effectively.',
          'Labels are the first line of communication about hazardous products. They appear directly on product containers and provide immediate, at-a-glance information about the product\'s hazards and how to work with it safely. WHMIS 2015 introduced standardized pictograms, signal words, hazard statements, and precautionary statements to make labels more consistent and easier to understand.',
          'Safety Data Sheets (SDS), formerly known as Material Safety Data Sheets (MSDS), provide comprehensive technical information about hazardous products. Each SDS follows a standardized 16-section format that covers everything from the product\'s chemical composition to emergency procedures, safe handling practices, and environmental considerations. Workers must have ready access to SDSs for all hazardous products they work with.',
          'Education and training ensure that workers understand how to use the information on labels and safety data sheets. Employers must provide WHMIS training to all workers who may be exposed to hazardous products. This training must cover general WHMIS principles as well as specific information about the hazardous products in the worker\'s particular workplace. Training must be provided before workers handle hazardous products and should be updated whenever new hazards are introduced.'
        ]
      },
      {
        heading: 'Roles and Responsibilities',
        paragraphs: [
          'WHMIS establishes clear responsibilities for three key groups: suppliers, employers, and workers. Each group has specific duties that contribute to the overall effectiveness of the system. Understanding these roles helps ensure that everyone knows what is expected of them and how they contribute to workplace safety.',
          'Suppliers of hazardous products are responsible for classifying their products according to WHMIS 2015 criteria, creating compliant labels, and preparing accurate safety data sheets. Suppliers must ensure that products are properly labeled before they leave the supplier\'s control and that SDSs are provided to purchasers. When suppliers obtain new hazard information about a product, they must update the SDS within 90 days and the label as soon as possible.',
          'Employers have extensive responsibilities under WHMIS. They must ensure that all hazardous products are properly labeled, maintain an up-to-date inventory of hazardous products, ensure that current SDSs are readily accessible to workers, provide WHMIS education and training to workers, and establish procedures for safe handling, storage, and disposal of hazardous materials. Employers must also implement procedures for emergencies involving hazardous products.',
          'Workers have the right to know about the hazards they may be exposed to and the responsibility to work safely. Workers must participate in WHMIS training, follow safe work procedures, use required personal protective equipment, report any missing or damaged labels to their supervisor, and inform their supervisor if they need additional information or training. Workers also have the right to refuse work they believe is unsafe, including situations where they have not received adequate WHMIS training or information.'
        ]
      }
    ],
    keyFacts: [
      'WHMIS is Canada\'s national standard for communicating information about hazardous materials in the workplace',
      'WHMIS 2015 aligns Canada with the Globally Harmonized System (GHS) used in over 70 countries worldwide',
      'The three key elements of WHMIS are: labels, safety data sheets (SDS), and education/training',
      'WHMIS applies to approximately 450,000 workplaces and protects over 13 million Canadian workers',
      'Both employers and workers have specific legal responsibilities under WHMIS legislation'
    ]
  },
  {
    id: 2,
    title: 'Hazard Classification',
    order: 2,
    icon: 'category',
    description: 'Understand how hazardous materials are classified into physical and health hazard categories under WHMIS 2015.',
    estimatedMinutes: 12,
    learningObjectives: [
      'Distinguish between physical hazards and health hazards',
      'Understand the hazard classification system and categories',
      'Recognize the main physical hazard classes',
      'Identify the main health hazard classes',
      'Understand how products are assigned to hazard classes and categories'
    ],
    sections: [
      {
        heading: 'Understanding Hazard Classification',
        paragraphs: [
          'Hazard classification is the foundation of WHMIS 2015. Before a product can be properly labeled or documented in a safety data sheet, it must first be classified according to standardized criteria. Classification involves evaluating the intrinsic properties of a material to determine what types of hazards it presents and how severe those hazards are.',
          'Under WHMIS 2015, hazards are organized into two main groups: physical hazards and health hazards. Physical hazards relate to the chemical or physical properties of a product, such as flammability or reactivity. Health hazards relate to the adverse health effects that can occur when a person is exposed to the product. Some products present only physical hazards, some only health hazards, and many present both types.',
          'Each hazard type is further divided into specific hazard classes, and most classes are subdivided into categories that indicate the severity of the hazard. Category 1 generally represents the most severe hazard, while higher category numbers indicate less severe hazards. However, not all hazard classes use the same numbering system, so it is important to understand the specific classification criteria for each hazard type.',
          'The responsibility for classifying products rests primarily with suppliers. Suppliers must evaluate test data, scientific studies, and other relevant information to determine how their products should be classified. However, employers may also need to classify products in certain situations, such as when they produce hazardous materials for use in their own workplace or when they receive unclassified materials.'
        ]
      },
      {
        heading: 'Physical Hazard Classes',
        paragraphs: [
          'Physical hazards encompass a wide range of properties related to how a material behaves chemically or physically. These hazards can lead to fires, explosions, violent reactions, or other dangerous situations if materials are not handled properly. WHMIS 2015 includes numerous physical hazard classes, each with specific classification criteria.',
          'Flammable materials are among the most common physical hazards encountered in workplaces. This category includes flammable gases (such as propane), flammable aerosols (like spray paints), flammable liquids (including gasoline and solvents), and flammable solids (such as certain metal powders). The classification considers factors like flash point, boiling point, and the material\'s ability to sustain combustion. Materials that ignite easily and burn rapidly are classified in more severe categories.',
          'Oxidizing materials pose a different type of fire hazard. Rather than burning themselves, oxidizers supply oxygen that allows other materials to burn more intensely. Oxidizing gases, liquids, and solids can cause or intensify fires and can make fire-fighting extremely difficult. Common examples include oxygen cylinders, hydrogen peroxide, and certain chlorine compounds used in pool maintenance and cleaning products.',
          'Other significant physical hazard classes include gases under pressure, which can burst containers if mishandled; corrosive to metals, which can damage equipment and containers; explosives and self-reactive substances, which can detonate or violently decompose; pyrophoric materials, which can spontaneously ignite when exposed to air; and substances that emit flammable gases on contact with water. Some materials also present hazards not covered by other classes and are classified as "physical hazards not otherwise classified."'
        ]
      },
      {
        heading: 'Health Hazard Classes',
        paragraphs: [
          'Health hazards describe the potential adverse health effects that can result from exposure to a hazardous product. These effects can range from mild irritation to life-threatening conditions, and they may occur immediately after exposure (acute effects) or develop over time with repeated exposure (chronic effects). Understanding health hazard classifications helps workers recognize the potential health risks they face and take appropriate protective measures.',
          'Acute toxicity refers to harmful effects that occur after a single exposure or multiple exposures within a short period (usually 24 hours or less). Materials with acute toxicity can cause effects ranging from skin or eye irritation to serious illness or death, depending on the category and exposure route. Exposure can occur through swallowing (oral), skin contact (dermal), or breathing (inhalation). Highly toxic substances, such as cyanide compounds, are classified in Category 1 or 2, while less toxic substances fall into higher category numbers.',
          'Chronic or long-term health hazards include some of the most serious classifications under WHMIS 2015. Carcinogenicity refers to materials that can cause cancer. Germ cell mutagenicity describes substances that can cause genetic mutations that may be passed to offspring. Reproductive toxicity includes effects on sexual function and fertility as well as developmental effects on unborn children. Specific target organ toxicity identifies materials that damage particular organs such as the liver, kidneys, nervous system, or respiratory system after single or repeated exposure.',
          'Other important health hazard classes include respiratory and skin sensitization, which can cause allergic reactions that may worsen with repeated exposure; aspiration hazard, which applies to materials that can enter the lungs and cause chemical pneumonia; and skin corrosion or irritation and serious eye damage or irritation. Biohazardous infectious materials represent a unique category covering organisms that can cause disease. Like physical hazards, materials may also present "health hazards not otherwise classified" when they pose risks not adequately addressed by the standard categories.'
        ]
      },
      {
        heading: 'How Classification Determines Communication',
        paragraphs: [
          'The hazard classification assigned to a product directly determines what information appears on its label and safety data sheet. Each hazard class and category is associated with specific pictograms, signal words, hazard statements, and precautionary statements. This standardized approach ensures that similar hazards are communicated consistently across all products and all suppliers.',
          'When a product is classified into multiple hazard classes, all relevant pictograms must appear on the label (though WHMIS allows certain exceptions when one pictogram would be redundant with another more severe hazard pictogram). The most severe classification determines the signal word: "Danger" is used for more severe hazards, while "Warning" is used for less severe hazards. Only one signal word appears on a label, even if the product has multiple hazards.',
          'Hazard statements are standardized phrases that describe the nature and severity of each hazard. For example, "Highly flammable liquid and vapor" or "Causes serious eye damage." These statements are precisely worded according to international GHS standards to ensure global consistency. Similarly, precautionary statements provide standardized information about prevention, response, storage, and disposal measures appropriate for each hazard.',
          'Understanding hazard classification helps workers make sense of the information they see on labels and safety data sheets. When workers know that a skull and crossbones pictogram indicates acute toxicity, or that the health hazard pictogram may signal a carcinogen, they can better assess the risks they face and take appropriate precautions. This understanding is fundamental to working safely with hazardous materials.'
        ]
      }
    ],
    keyFacts: [
      'WHMIS 2015 classifies hazards into two main groups: physical hazards and health hazards',
      'Category 1 typically indicates the most severe hazard within a hazard class',
      'Suppliers are responsible for classifying products according to WHMIS 2015 criteria',
      'A product can be classified into multiple hazard classes if it presents more than one type of hazard',
      'Hazard classification determines which pictograms, signal words, and statements appear on labels and SDSs'
    ]
  },
  {
    id: 3,
    title: 'WHMIS Pictograms',
    order: 3,
    icon: 'warning',
    description: 'Learn to recognize and understand the nine GHS pictograms used in WHMIS 2015 and what they mean for your safety.',
    estimatedMinutes: 15,
    learningObjectives: [
      'Recognize all nine WHMIS 2015 pictograms',
      'Understand what each pictogram represents',
      'Identify examples of products associated with each pictogram',
      'Know what actions to take when you see each pictogram',
      'Understand how pictograms appear on labels and in safety data sheets'
    ],
    sections: [
      {
        heading: 'Introduction to WHMIS Pictograms',
        paragraphs: [
          'Pictograms are the most immediately recognizable element of WHMIS 2015 labels. These standardized symbols provide instant visual communication about the types of hazards a product presents. Unlike text, which requires reading and language comprehension, pictograms can be recognized at a glance, making them a powerful tool for hazard communication in diverse workplaces.',
          'WHMIS 2015 uses pictograms from the Globally Harmonized System (GHS), which means the same pictograms appear on hazardous products around the world. Each pictogram consists of a black symbol on a white background, framed within a red diamond border. This distinctive red diamond border immediately draws attention and signals that the product presents a hazard requiring caution.',
          'Nine pictograms are used in WHMIS 2015, each representing one or more hazard classes. Some pictograms represent primarily physical hazards, some represent health hazards, and one represents biohazardous infectious materials. A single product may display multiple pictograms if it presents multiple types of hazards. For example, a solvent might display both the flame pictogram (flammable) and the exclamation mark pictogram (irritant).',
          'Understanding pictograms is essential for workplace safety. When you see a pictogram on a product label, you should immediately recognize the general type of hazard and take appropriate precautions. This might mean ensuring adequate ventilation, using specific personal protective equipment, keeping the product away from ignition sources, or handling it with particular care to avoid spills or exposure.'
        ]
      },
      {
        heading: 'Physical Hazard Pictograms',
        paragraphs: [
          'The flame pictogram depicts a stylized fire and indicates that a product is flammable. This is one of the most commonly encountered pictograms in workplaces. It applies to flammable gases, aerosols, liquids, and solids. When you see this pictogram, keep the product away from heat, sparks, open flames, and hot surfaces. Ensure adequate ventilation and eliminate ignition sources in the work area. Common examples include gasoline, paint thinners, acetone, aerosol spray products, and certain wood dusts.',
          'The flame over circle pictogram shows a flame above a circle and warns that a product is an oxidizer. Oxidizing materials do not burn themselves, but they can cause or intensify fires by providing oxygen to support combustion. These products must be kept away from flammable and combustible materials. They should be stored in cool, well-ventilated areas and never mixed with incompatible materials. Examples include oxygen cylinders, hydrogen peroxide, pool chlorine, and some laboratory chemicals.',
          'The gas cylinder pictogram shows a gas cylinder and indicates that a product contains gas under pressure. Gases under pressure can present multiple hazards. Compressed gases can burst containers if heated, causing flying debris and releasing the gas suddenly. Liquefied gases can cause cold burns (frostbite) if they contact skin. Dissolved gases may have properties that make them dangerous if released. Always secure gas cylinders properly, store them in cool areas, and protect them from physical damage. Examples include welding gases, propane cylinders, carbon dioxide tanks, and compressed air.',
          'The exploding bomb pictogram shows an explosion and indicates explosive materials or self-reactive substances. These materials can explode or violently decompose due to heat, shock, friction, or contamination. They require extremely careful handling and often special storage conditions. Keep them away from heat, sparks, and sources of shock or friction. Examples include fireworks, certain organic peroxides, and self-reactive substances used in chemical manufacturing. The corrosion pictogram shows a chemical substance causing corrosion damage to a surface and a hand, indicating materials that are corrosive to metals or cause skin corrosion or serious eye damage.'
        ],
        pictogramIds: ['flame', 'flame-over-circle', 'gas-cylinder', 'exploding-bomb', 'corrosion']
      },
      {
        heading: 'Health Hazard Pictograms',
        paragraphs: [
          'The skull and crossbones pictogram is perhaps the most universally recognized hazard symbol. It indicates acute toxicity, meaning the product can cause serious poisoning or death after a single exposure or multiple exposures over a short period. Products with this pictogram are highly toxic if swallowed, inhaled, or absorbed through the skin. Even small amounts can be harmful or fatal. Never eat, drink, or smoke when handling these products, and always use required personal protective equipment. Examples include pesticides, cyanide compounds, arsenic, and certain industrial chemicals.',
          'The health hazard pictogram shows a human silhouette with a starburst on the chest and is one of the most serious warning symbols in WHMIS 2015. It indicates materials that can cause serious long-term health effects. These may include cancer (carcinogenicity), respiratory sensitization, reproductive damage, effects on unborn children, genetic defects (germ cell mutagenicity), damage to specific organs, or aspiration hazards that can cause chemical pneumonia. Because these effects may not appear immediately and can result from exposures over time, it is critical to follow all safety precautions consistently. Examples include asbestos, silica dust, benzene, formaldehyde, and lead compounds.',
          'The exclamation mark pictogram warns of less severe health hazards, but "less severe" does not mean "not serious." This pictogram indicates materials that can cause skin or eye irritation, skin sensitization (allergic reactions), acute toxicity in higher (less dangerous) categories, or narcotic effects like drowsiness and dizziness. While these effects are generally not life-threatening, they can still cause significant discomfort and may lead to more serious problems if exposure continues. Use appropriate personal protective equipment and ensure adequate ventilation. Examples include ammonia solutions, isopropyl alcohol, fiberglass, chlorine bleach, and many paint thinners.',
          'The biohazardous infectious materials pictogram shows the international biohazard symbol and is used for materials that contain organisms capable of causing disease in humans or animals. This pictogram appears on medical waste, laboratory cultures, blood and body fluids, and other biological materials that may be contaminated with infectious agents. These materials require special handling, containment, and disposal procedures to prevent the spread of disease. Always use appropriate personal protective equipment including gloves, and follow your workplace procedures for handling and disposing of biohazardous materials.'
        ],
        pictogramIds: ['skull-crossbones', 'health-hazard', 'exclamation-mark', 'biohazard']
      },
      {
        heading: 'Using Pictogram Information in the Workplace',
        paragraphs: [
          'Recognizing pictograms is only the first step; workers must also know how to use pictogram information to work safely. When you encounter a product with pictograms, first stop and identify all pictograms present. Each pictogram tells you something important about the hazards. Next, consult the product label for more detailed information, including hazard statements and precautionary statements that provide specific guidance for that particular product.',
          'Before using a product with hazard pictograms, always consult its safety data sheet (SDS). The SDS provides comprehensive information about the hazards indicated by the pictograms, including detailed descriptions of potential health effects, first aid measures, safe handling procedures, and required personal protective equipment. Section 2 of the SDS repeats the label information including pictograms, and other sections provide the technical details you need to work safely.',
          'Different pictograms require different precautions. For flammability pictograms, eliminate ignition sources and ensure adequate ventilation. For corrosion pictograms, use chemical-resistant gloves and eye protection. For health hazard pictograms, use respiratory protection if required and follow exposure control measures strictly. For acute toxicity pictograms, prevent any exposure and have emergency response procedures in place. Your employer should provide specific training on the hazards in your workplace and the control measures required.',
          'Remember that pictograms apply to the product as supplied. If you transfer a hazardous product to a different container, that container needs a workplace label that includes hazard information. If you are unsure what pictograms were on the original container, check the SDS or ask your supervisor. Never use a product if you cannot identify its hazards. When you see damaged labels or missing pictograms, report it to your supervisor immediately so the label can be replaced.'
        ]
      }
    ],
    keyFacts: [
      'All nine WHMIS pictograms feature a black symbol on white background inside a red diamond border',
      'Pictograms provide instant visual communication about hazards without requiring language skills',
      'A single product may display multiple pictograms if it presents multiple types of hazards',
      'The skull and crossbones indicates acute toxicity (highly poisonous materials)',
      'Always consult the full label and safety data sheet to understand the complete hazard picture'
    ]
  },
  {
    id: 4,
    title: 'Supplier & Workplace Labels',
    order: 4,
    icon: 'label',
    description: 'Understand the two types of WHMIS labels, their required elements, and when each type is used.',
    estimatedMinutes: 12,
    learningObjectives: [
      'Distinguish between supplier labels and workplace labels',
      'Identify the six required elements of a supplier label',
      'Understand the three required elements of a workplace label',
      'Know when workplace labels are required',
      'Recognize compliant WHMIS 2015 labels'
    ],
    sections: [
      {
        heading: 'Two Types of WHMIS Labels',
        paragraphs: [
          'WHMIS 2015 uses two types of labels: supplier labels and workplace labels. Both serve the essential function of communicating hazard information directly on product containers, but they differ in format, required information, and when they are used. Understanding both types of labels is crucial because you may encounter both in your workplace.',
          'Supplier labels are prepared by the manufacturer or importer of a hazardous product. These labels must be applied to products before they are sold or imported into Canada. Supplier labels follow a standardized format and must include all required WHMIS information. When you receive a product from a supplier, it should have a supplier label already attached to the container.',
          'Workplace labels are created by employers for use within their workplace. These labels are required when a hazardous product is transferred from its original container into a different container, when a supplier label is missing or illegible, or when a product is produced and used within the workplace. Workplace labels can be less detailed than supplier labels but must still provide essential safety information.',
          'Both types of labels serve as the first point of contact with hazard information. Before using any hazardous product, workers should read and understand its label. Labels provide critical at-a-glance information that helps workers recognize hazards and take appropriate precautions. They also direct workers to the safety data sheet for more detailed information.'
        ]
      },
      {
        heading: 'Supplier Label Requirements',
        paragraphs: [
          'A WHMIS 2015 supplier label must include six specific elements, each serving a distinct purpose in hazard communication. These six elements must appear in English and French (Canada\'s official languages), making supplier labels bilingual. The standardized format ensures that regardless of who manufactures a product, its label will provide consistent, comparable information.',
          'The first required element is the product identifier, which is the name of the hazardous product. This name must be identical to the product identifier on the safety data sheet and must match how the product is identified in the hazard classification. The product identifier helps ensure that workers are looking at the correct SDS for the product they are using. It must be prominently displayed on the label so workers can immediately identify what product they are handling.',
          'The second element is the initial supplier identifier, which is the name, address, and telephone number of the Canadian manufacturer or importer. This information allows users to contact the supplier with questions, request additional information, or report problems. If a product is imported, the initial supplier identifier refers to the Canadian importer who first brought the product into Canada, not the foreign manufacturer.',
          'The third element consists of pictograms, which we covered in detail in Module 3. All applicable pictograms for the product\'s hazard classifications must appear on the label. Each pictogram must be a red-bordered diamond containing the black hazard symbol on a white background. Pictograms must be sufficiently large to be clearly visible and recognizable. The fourth element is the signal word, either "Danger" (for more severe hazards) or "Warning" (for less severe hazards). Only one signal word appears on a label even if the product has multiple hazards. The fifth element includes hazard statements, which are standardized phrases describing the nature and severity of each hazard, such as "Extremely flammable aerosol" or "Causes skin irritation." The sixth element consists of precautionary statements, which provide information on prevention, response, storage, and disposal appropriate for the product\'s hazards.'
        ]
      },
      {
        heading: 'Workplace Label Requirements',
        paragraphs: [
          'Workplace labels are simpler than supplier labels but must still provide essential hazard information. A workplace label must include three required pieces of information: product identifier, safe handling information, and a reference to the safety data sheet. Unlike supplier labels, workplace labels do not need to be bilingual unless required by provincial or territorial legislation, though many employers choose to make them bilingual as a best practice.',
          'The product identifier on a workplace label must match the product identifier on the supplier label and safety data sheet. This ensures that workers can correctly link the product in the container to its SDS. Consistency in product identification is critical for safety; if a workplace label uses a different name than the SDS, workers might not be able to find the correct safety information.',
          'Safe handling information on a workplace label should include precautions for the safe handling, storage, and use of the hazardous product. This may include statements like "Keep away from heat," "Use in well-ventilated area," or "Wear safety glasses." While workplace labels are not required to include all the detailed precautionary statements found on supplier labels, they must provide enough information for safe handling. Many employers choose to include pictograms on workplace labels, which is permitted and provides additional visual communication of hazards.',
          'The reference to the safety data sheet can be a simple statement such as "See SDS for more information" or "SDS available from supervisor." This reference reminds workers that detailed information is available and tells them how to access it. Employers must ensure that SDSs are readily accessible to workers during their work shift. Workplace labels are required whenever a hazardous product is transferred to a container other than the one it came in from the supplier, unless the product will be used immediately by the person who transferred it. Workplace labels are also required when the supplier label is damaged, illegible, or missing, or when a hazardous product is produced at the workplace and used there.'
        ]
      },
      {
        heading: 'Label Format and Special Considerations',
        paragraphs: [
          'WHMIS 2015 requires that supplier labels have a specific appearance. The border may be any shape, but it must be outlined with a solid line called a hatched border. This border helps distinguish WHMIS labels from other labels and markings that might appear on containers. The hatched border is not required for workplace labels, but many employers include it anyway to maintain visual consistency.',
          'Labels must be durable and legible, able to withstand the normal conditions of use and storage for the product. This means labels for outdoor use must resist weather, labels for products stored in freezers must remain legible at low temperatures, and labels for products that might be exposed to chemicals must resist degradation. If a label becomes damaged, illegible, or detaches from the container, the employer must replace it immediately.',
          'The size of labels and label elements can vary depending on the size of the container and the amount of information that needs to be included. However, all required information must be legible and pictograms must be large enough to be clearly recognizable. For very small containers where a full supplier label cannot fit, special provisions allow abbreviated labels, but the SDS must be readily available and workers must be trained on how to access information.',
          'Special labeling rules apply to certain situations. Bulk shipments may use other means of communicating hazard information, such as shipping documents or placards. Laboratory samples and small quantities for research and testing may have modified labeling requirements. Portable containers that will be used immediately by the worker who filled them do not require workplace labels, but if the product is not used immediately or if the container will be left unattended, a workplace label is required. When in doubt about whether a label is required or what information must be included, consult your supervisor or your workplace WHMIS coordinator.'
        ]
      }
    ],
    keyFacts: [
      'Supplier labels must include six required elements: product identifier, supplier identifier, pictograms, signal word, hazard statements, and precautionary statements',
      'Workplace labels must include three required elements: product identifier, safe handling information, and SDS reference',
      'Supplier labels must be bilingual (English and French) in Canada',
      'A workplace label is required when transferring a hazardous product to a different container (unless for immediate use)',
      'The hatched border (solid outline) is required for supplier labels but not for workplace labels'
    ]
  },
  {
    id: 5,
    title: 'Safety Data Sheets (SDS)',
    order: 5,
    icon: 'description',
    description: 'Learn to read and use the 16-section Safety Data Sheet format to access detailed information about hazardous materials.',
    estimatedMinutes: 15,
    learningObjectives: [
      'Understand the purpose of safety data sheets',
      'Navigate the 16-section SDS format',
      'Locate key information in an SDS',
      'Know when and how to access SDSs',
      'Understand employer responsibilities for maintaining SDSs'
    ],
    sections: [
      {
        heading: 'What is a Safety Data Sheet?',
        paragraphs: [
          'A Safety Data Sheet, or SDS, is a comprehensive technical document that provides detailed information about a hazardous product. While labels provide essential information at a glance, the SDS contains in-depth technical and safety information that workers, supervisors, and emergency responders need to handle, store, and respond to hazardous products safely. Every hazardous product covered by WHMIS must have an SDS.',
          'Under WHMIS 1988, these documents were called Material Safety Data Sheets (MSDS). WHMIS 2015 changed the name to Safety Data Sheets and, more importantly, standardized the format. All SDSs must now follow a consistent 16-section format in a specific order. This standardization makes it much easier to find information because the same type of information always appears in the same section, regardless of the product or supplier.',
          'SDSs serve multiple audiences. Workers use SDSs to understand the hazards of products they work with and to learn safe handling procedures. Supervisors and managers use SDSs to develop safe work procedures, select appropriate personal protective equipment, and plan for emergencies. Health and safety professionals use SDSs to conduct workplace assessments and exposure monitoring. Emergency responders use SDSs when responding to spills, fires, or other incidents involving hazardous products.',
          'Employers are legally required to ensure that an SDS is readily accessible to workers for every hazardous product in the workplace. "Readily accessible" means workers can access the SDS quickly during their work shift. Many employers maintain both paper and electronic SDS collections, though if SDSs are kept electronically, workers must have access to the necessary equipment to view them, and a backup system must be available if electronic systems fail.'
        ]
      },
      {
        heading: 'The 16-Section Format: Sections 1-8',
        paragraphs: [
          'Section 1, Identification, provides basic product and supplier information. This section includes the product identifier (which must match the label), other means of identification (such as trade names or synonyms), recommended use of the chemical and restrictions on use, and details of the supplier including name, address, and emergency phone number. This section also includes the emergency telephone number, which is critical in case of incidents.',
          'Section 2, Hazard Identification, contains the same information that appears on the label. This includes the classification of the hazardous product, the signal word (Danger or Warning), hazard pictograms, hazard statements, and precautionary statements. This section may also include other hazards not classified under WHMIS but which the supplier chooses to communicate, such as combustible dust hazards. Having label information in the SDS allows workers to reference it even if they cannot read the label on the container.',
          'Section 3, Composition/Information on Ingredients, identifies the chemical ingredients in the product. For pure substances, this section provides the chemical name, common name and synonyms, CAS number (a unique identifier for chemicals), and impurities and stabilizing additives that are themselves hazardous. For mixtures, this section lists hazardous ingredients above certain concentration thresholds. Note that some chemical identity information may be protected as confidential business information, but health and safety information must still be disclosed.',
          'Section 4, First-Aid Measures, describes immediate care that should be given to a person exposed to the product. This section is organized by exposure route (inhalation, skin contact, eye contact, ingestion) and provides instructions for each. It also describes the most important symptoms and effects (both acute and delayed) and indicates whether immediate medical attention is required. While this information is valuable for initial response, remember that serious exposures require professional medical care, and this section should not be considered a substitute for medical advice.'
        ]
      },
      {
        heading: 'The 16-Section Format: Sections 5-12',
        paragraphs: [
          'Section 5, Fire-Fighting Measures, provides information for firefighters and emergency responders. It describes suitable extinguishing media (what types of fire extinguishers or suppression systems work for this product) and unsuitable extinguishing media (what should not be used). It identifies specific hazards arising from the chemical, such as toxic combustion products, and recommends special protective equipment and precautions for firefighters. This information is crucial during fire emergencies.',
          'Section 6, Accidental Release Measures, describes appropriate response procedures for spills, leaks, or releases. It covers personal precautions, protective equipment, and emergency procedures, including whether to evacuate the area. It explains environmental precautions to prevent the release from spreading to drains or waterways. It also provides methods and materials for containment and cleanup, specifying what materials to use to absorb or contain the spill and how to dispose of contaminated cleanup materials.',
          'Section 7, Handling and Storage, provides guidance for safe handling practices to minimize risks. This includes precautions for safe handling such as hygiene measures and technical measures like ventilation requirements. It describes conditions for safe storage, including any incompatibilities with other materials. This section tells you what materials should not be stored near each other because they could react dangerously if mixed. Following the guidance in this section helps prevent incidents.',
          'Section 8, Exposure Controls/Personal Protection, is one of the most practically important sections for workers. It lists occupational exposure limits (such as Threshold Limit Values or Permissible Exposure Limits) that define safe exposure levels. It describes appropriate engineering controls such as ventilation systems or enclosed processes. Most importantly for workers, it specifies required personal protective equipment for eyes, face, skin, hands, respiratory system, and other body areas. This section tells you exactly what PPE you should wear when working with the product and may specify particular types or materials of PPE that provide adequate protection.'
        ]
      },
      {
        heading: 'The 16-Section Format: Sections 9-16 and Using SDSs',
        paragraphs: [
          'Section 9, Physical and Chemical Properties, lists characteristics such as appearance, odor, pH, melting point, boiling point, flash point, flammability limits, vapor pressure, vapor density, relative density, solubility, and other properties. While highly technical, these properties help understand how the product behaves and what hazards it presents. Section 10, Stability and Reactivity, describes the chemical stability of the product, the possibility of hazardous reactions, conditions to avoid (such as heat or shock), incompatible materials that could cause dangerous reactions, and hazardous decomposition products that might form.',
          'Section 11, Toxicological Information, provides detailed scientific information about health effects. This includes likely routes of exposure, symptoms related to physical, chemical, and toxicological characteristics, and delayed and immediate effects as well as chronic effects from short- and long-term exposure. It includes numerical measures of toxicity such as LD50 and LC50 values. This section is often technical but provides the scientific basis for the hazard classifications and health warnings.',
          'Section 12, Ecological Information, addresses environmental effects including ecotoxicity, persistence and degradability, bioaccumulative potential, and mobility in soil. Section 13, Disposal Considerations, provides guidance on safe disposal methods, though it typically refers users to local regulations since disposal requirements vary by location. Section 14, Transport Information, covers shipping classifications and requirements under transportation of dangerous goods regulations. Section 15, Regulatory Information, cites safety, health, and environmental regulations specific to the product. Section 16, Other Information, includes the date of preparation or last revision, any changes since the last version, and other information such as key references.',
          'To use an SDS effectively, first ensure you are looking at the correct SDS for your product by checking that the product identifier matches. Then consult the specific sections relevant to your needs. Section 2 gives you a quick overview of hazards. Section 8 tells you what protective equipment to use. Sections 4 and 6 are critical for emergency response. Review the SDS before working with a new product, and refer back to it whenever you have questions. Employers must ensure SDSs are current; suppliers must update SDSs within 90 days of receiving new hazard information, and employers must replace older SDSs with updated versions. Remember that SDSs are technical documents, and if you do not understand something in an SDS, ask your supervisor or health and safety representative for clarification.'
        ]
      }
    ],
    keyFacts: [
      'All Safety Data Sheets must follow a standardized 16-section format in a specific order',
      'Section 2 contains the same hazard information that appears on the product label',
      'Section 8 specifies required personal protective equipment and exposure controls',
      'Employers must ensure SDSs are readily accessible to workers during their work shift',
      'SDSs must be updated within 90 days when suppliers receive new hazard information, and must be reviewed and reissued at least every three years'
    ]
  },
  {
    id: 6,
    title: 'Personal Protective Equipment',
    order: 6,
    icon: 'health_and_safety',
    description: 'Learn about the types of personal protective equipment, how to select and use PPE properly, and its role in workplace safety.',
    estimatedMinutes: 10,
    learningObjectives: [
      'Understand the role of PPE in hazard control',
      'Identify different types of PPE and their uses',
      'Learn how to select appropriate PPE based on SDS information',
      'Understand proper PPE inspection, use, and maintenance',
      'Recognize the limitations of PPE'
    ],
    sections: [
      {
        heading: 'The Role of Personal Protective Equipment',
        paragraphs: [
          'Personal Protective Equipment, commonly called PPE, refers to equipment worn to minimize exposure to hazards that can cause injury or illness. In the context of WHMIS, PPE provides a barrier between workers and hazardous materials, reducing the risk of exposure through contact, inhalation, or absorption. While PPE is an essential component of workplace safety, it is important to understand that it is the last line of defense, not the first.',
          'The hierarchy of hazard controls places elimination and substitution at the top. The most effective way to protect workers is to eliminate hazards entirely or substitute less hazardous materials. When elimination or substitution is not possible, engineering controls such as ventilation systems, containment, or process automation should be implemented to reduce exposure. Administrative controls, including safe work procedures and training, further reduce risk. PPE comes last in this hierarchy because it only protects the individual wearing it and provides no protection if it fails or is not used properly.',
          'Despite being the last line of defense, PPE remains critically important for work with hazardous materials. Even with excellent engineering and administrative controls, some level of exposure risk often remains. PPE provides essential protection during normal operations and becomes even more critical during emergencies such as spills or equipment failures when exposure risks increase dramatically. The key is to use PPE as part of a comprehensive safety program, not as a substitute for other controls.',
          'Employers are responsible for conducting hazard assessments to determine what PPE is required, providing appropriate PPE to workers at no cost, ensuring that PPE fits properly, and training workers on its correct use and limitations. Workers are responsible for using PPE as required, inspecting it before each use, maintaining it properly, and reporting any damaged or defective PPE to their supervisor immediately.'
        ]
      },
      {
        heading: 'Types of Personal Protective Equipment',
        paragraphs: [
          'Head protection includes hard hats and bump caps that protect against impact, penetration, and electrical hazards. In workplaces with hazardous materials, head protection may also be needed to protect against splashes or spills. Eye and face protection includes safety glasses, goggles, and face shields. Safety glasses with side shields protect against impact from flying particles. Chemical splash goggles form a seal around the eyes and protect against liquids. Face shields provide additional protection for the face but should be worn with safety glasses or goggles, not as a substitute, because they do not seal against the face.',
          'Respiratory protection ranges from simple disposable dust masks to complex supplied-air respirators. The type of respiratory protection required depends on the specific hazards present and the concentration of contaminants in the air. Particulate respirators (N95, N99, P100) filter particles from the air and are rated by their filtering efficiency. Chemical cartridge respirators use replaceable cartridges to remove specific gases and vapors from air. Supplied-air respirators provide clean air from an external source and are used in environments with very high contamination or oxygen deficiency. Respiratory protection requires proper fit testing, medical clearance, and training.',
          'Hand protection is one of the most commonly used types of PPE when working with hazardous materials. However, not all gloves protect against all hazards. Chemical-resistant gloves are made from various materials including nitrile, neoprene, PVC, butyl rubber, and others. Each material provides protection against different chemicals. Section 8 of the SDS typically specifies appropriate glove materials for the product. Gloves must be inspected before each use for tears, punctures, or degradation, and they must be the right size to allow dexterity while maintaining protection. Remember that gloves can absorb or be penetrated by chemicals over time; breakthrough time information guides how long gloves can be worn safely.',
          'Foot protection includes safety boots and shoes with protective toe caps, puncture-resistant soles, and slip-resistant treads. When working with corrosive materials, chemical-resistant footwear or boot covers may be required. Body protection ranges from lab coats and aprons to full chemical suits. The level of protection needed depends on the hazards and the likelihood and severity of exposure. Hearing protection, including earplugs and earmuffs, protects against noise hazards that may be present in environments where hazardous materials are used. While not directly related to chemical hazards, hearing protection may be required in manufacturing or processing environments.'
        ]
      },
      {
        heading: 'Selecting and Using PPE Properly',
        paragraphs: [
          'Selecting appropriate PPE begins with consulting the Safety Data Sheet. Section 8 of the SDS provides specific recommendations for personal protective equipment, including the type of protection needed for eyes, face, hands, respiratory system, and body. Pay close attention to any specific materials or ratings mentioned; for example, an SDS might specify "nitrile gloves with minimum thickness of 0.4mm" rather than just "chemical-resistant gloves."',
          'Proper fit is crucial for PPE to provide adequate protection. Poorly fitting PPE can be uncomfortable, limit mobility, and fail to provide protection. Respiratory protection requires formal fit testing to ensure that the respirator seals properly to the wearer\'s face. Safety glasses and goggles should fit snugly without gaps. Gloves should be the right size to provide both protection and dexterity. Employers must provide PPE in a range of sizes and styles to accommodate different workers.',
          'Before each use, inspect PPE for damage, wear, or contamination. Check gloves for tears, holes, or discoloration that might indicate chemical degradation. Examine safety glasses for scratches that could impair vision or cracks that compromise protection. Inspect respirator facepieces for cracks or damaged seals, and check that valves move freely. If PPE is damaged, do not use it; report the damage and obtain replacement PPE before working with hazardous materials.',
          'Using PPE correctly requires training and practice. Gloves must be donned without contaminating the inside and removed carefully to avoid contacting the contaminated exterior. Respirators require proper donning procedures and seal checks every time they are worn. Safety glasses must be worn consistently; removing them "just for a minute" is when many eye injuries occur. Contaminated PPE must be removed properly to prevent exposure during removal, and it must be cleaned or disposed of appropriately. Never take contaminated PPE into clean areas such as break rooms or offices.'
        ]
      },
      {
        heading: 'Limitations and Maintenance of PPE',
        paragraphs: [
          'Understanding the limitations of PPE is as important as knowing how to use it. PPE provides protection only to the person wearing it; unlike engineering controls that protect everyone in the area, PPE offers no protection if it is not worn. PPE can fail if it is damaged, degraded by chemicals, or used beyond its rated capacity. For example, gloves have a limited breakthrough time; after a chemical has been in contact with the glove for a certain period, it will begin to penetrate through to the skin. PPE can also fail if it is not appropriate for the specific hazard; wearing the wrong type of gloves can provide a false sense of security while offering little or no actual protection.',
          'PPE can also create hazards if not used properly. Loose gloves or clothing can catch in machinery. Respirators increase breathing resistance and can contribute to heat stress. Face shields can fog and impair vision. Some PPE limits mobility or manual dexterity. These limitations do not mean PPE should not be used, but they must be considered when planning work activities. Take extra care when wearing PPE, allow additional time for tasks if PPE affects your mobility or dexterity, and never modify or alter PPE to make it more comfortable.',
          'Proper maintenance extends the life of PPE and ensures it remains effective. Reusable PPE must be cleaned regularly according to manufacturer instructions. Respirators require thorough cleaning and disinfection between uses, and elastomeric parts should be inspected for flexibility and signs of deterioration. Safety glasses should be cleaned with appropriate cleaners to avoid scratching lenses. Gloves that will be reused must be decontaminated carefully, though many workplaces use disposable gloves to avoid contamination concerns.',
          'PPE must be stored properly when not in use. Store PPE in a clean, dry location away from sunlight, extreme temperatures, and contaminants. Store respirators in sealed bags or containers to protect them from dust and physical damage. Never store contaminated PPE with clean PPE. Replace PPE according to manufacturer recommendations or when it shows signs of wear, damage, or degradation. Keep records of PPE inspections, maintenance, and replacement to ensure your PPE remains in good condition. Remember that you have the right to properly functioning PPE; if your PPE is not adequate or is not in good condition, inform your supervisor and do not work with hazardous materials until proper PPE is provided.'
        ]
      }
    ],
    keyFacts: [
      'PPE is the last line of defense in the hierarchy of controls; engineering and administrative controls should be used first',
      'Section 8 of the Safety Data Sheet specifies required personal protective equipment for each product',
      'All PPE must be inspected before each use for damage, wear, or contamination',
      'Not all gloves protect against all chemicals; the SDS specifies appropriate glove materials',
      'Employers must provide properly fitting PPE at no cost to workers, and workers must use it as required'
    ]
  },
  {
    id: 7,
    title: 'Worker Rights & Responsibilities',
    order: 7,
    icon: 'gavel',
    description: 'Understand your rights and responsibilities as a worker, including the right to know, participate, and refuse unsafe work.',
    estimatedMinutes: 8,
    learningObjectives: [
      'Understand the three fundamental worker rights',
      'Know your responsibilities as a worker under WHMIS',
      'Understand employer obligations for WHMIS compliance',
      'Learn how to exercise your right to refuse unsafe work',
      'Know what to do in emergencies involving hazardous materials'
    ],
    sections: [
      {
        heading: 'The Three Fundamental Worker Rights',
        paragraphs: [
          'Canadian occupational health and safety legislation establishes three fundamental rights for all workers. These rights form the foundation of workplace safety and apply to all aspects of work, including situations involving hazardous materials. Understanding these rights empowers you to protect yourself and your coworkers from harm.',
          'The right to know means you have the right to be informed about hazards in your workplace and how to protect yourself. Under WHMIS, this includes the right to receive WHMIS training before working with hazardous materials, the right to access labels and safety data sheets for all hazardous products you may be exposed to, and the right to receive information about the results of workplace monitoring or testing that relates to your health and safety. Employers cannot keep health and safety information secret or withhold information about hazards you may face.',
          'The right to participate means you have the right to be involved in identifying and resolving health and safety concerns. This includes the right to participate in workplace health and safety committees or to serve as a worker health and safety representative. You have the right to participate in workplace inspections, hazard assessments, and the development of safe work procedures. Your knowledge and experience as a worker is valuable; you often see hazards and unsafe conditions that others might miss. Employers must ensure there are systems in place for workers to raise concerns and participate in health and safety activities.',
          'The right to refuse unsafe work is perhaps the most powerful worker right. If you have reasonable cause to believe that working with a hazardous material or performing a task would be dangerous to yourself or another person, you have the right to refuse to do that work. This right is protected by law; employers cannot punish or discipline workers for exercising the right to refuse in good faith. However, this right comes with procedures that must be followed, and there are some limited exceptions in situations where the refusal would directly endanger another person\'s life, health, or safety.'
        ]
      },
      {
        heading: 'Worker Responsibilities Under WHMIS',
        paragraphs: [
          'With rights come responsibilities. Workers have important duties under WHMIS and health and safety legislation. Fulfilling these responsibilities protects not only yourself but also your coworkers and others who may be affected by your work. Taking responsibility for safety is a fundamental part of every worker\'s job.',
          'Your first responsibility is to participate in WHMIS training provided by your employer and to apply what you learn. Pay attention during training, ask questions when you do not understand something, and put your training into practice on the job. If you feel you have not received adequate training for the hazardous materials you work with, tell your supervisor. Training is not just something to get through; it provides the knowledge you need to work safely.',
          'You must follow safe work procedures and use personal protective equipment as required. When procedures exist for handling hazardous materials, follow them consistently, even when you are in a hurry or when shortcuts seem tempting. Procedures are developed to protect you, and taking shortcuts can lead to exposure or injury. Similarly, use required PPE every time, not just when it is convenient. Remove damaged PPE from service and report the need for replacement.',
          'Report hazards, damaged labels, missing safety data sheets, or any other health and safety concerns to your supervisor promptly. Do not assume someone else will report a problem. If you notice a damaged label, report it so it can be replaced. If you cannot find an SDS for a product you are supposed to use, do not proceed until the SDS is located. If you see a spill or a hazardous condition, report it immediately. Never use or handle a product if you have not been trained on its hazards and safe handling procedures or if you are unsure about any aspect of working with it safely.'
        ]
      },
      {
        heading: 'Employer Obligations and Your Right to Refuse',
        paragraphs: [
          'Employers have extensive obligations under WHMIS and occupational health and safety legislation. Understanding these obligations helps you know what to expect and when something may not be in compliance. Employers must ensure that all hazardous products are properly labeled, either with supplier labels or workplace labels as appropriate. They must obtain and maintain an up-to-date Safety Data Sheet for every hazardous product in the workplace and ensure that SDSs are readily accessible to workers.',
          'Employers must provide WHMIS education and training to all workers who work with or may be exposed to hazardous materials. This training must be provided before you begin working with hazardous materials, and it must cover both general WHMIS principles and specific information about the hazardous products in your workplace. Training must be updated when new hazards are introduced or when there are changes to how products are used. Employers must also develop and implement safe work procedures, provide appropriate personal protective equipment at no cost to workers, and establish emergency procedures.',
          'If you believe that working with a hazardous material or performing a particular task would be unsafe, you have the right to refuse that work. The specific procedure for exercising this right varies by jurisdiction, but generally, you should inform your supervisor of your refusal and explain your concerns. The supervisor must investigate the situation in your presence. If the matter is not resolved, it is typically referred to the workplace health and safety committee or representative and may eventually be referred to the government health and safety inspector.',
          'During a work refusal, you cannot be assigned other work in the same area if that work would expose you to the same danger. Importantly, you must remain available at the workplace unless your employer permits you to leave. You are entitled to be paid during a work refusal investigation. The employer cannot discipline, penalize, or punish you for exercising the right to refuse unsafe work in good faith. However, it is important that the refusal be based on reasonable grounds; the right to refuse is not a right to refuse work you simply find difficult or unpleasant.'
        ]
      },
      {
        heading: 'Emergency Procedures',
        paragraphs: [
          'Despite best efforts at prevention, emergencies involving hazardous materials can occur. Knowing what to do in an emergency can prevent injuries, minimize environmental damage, and save lives. Your workplace should have emergency procedures in place, and you should be familiar with them before an emergency happens.',
          'If a spill, leak, release, or other emergency occurs involving a hazardous material, your first priority is safety. Evacuate the immediate area if necessary and warn others about the hazard. Do not attempt to clean up a spill or handle an emergency if you have not been trained to do so or if the situation is beyond your training and the available equipment. Report the emergency immediately according to your workplace procedures; this typically means notifying your supervisor, calling an internal emergency number, or activating an alarm.',
          'If someone is exposed to a hazardous material, consult the Safety Data Sheet for first aid information. Section 4 of the SDS provides initial first aid measures for different types of exposure. Follow these recommendations while waiting for medical help to arrive. For serious exposures, always seek professional medical attention even if the person seems to feel fine; some health effects are delayed. When calling for medical help or transporting someone to a medical facility, bring the product\'s SDS or at minimum provide the product identifier so medical personnel know what the person was exposed to.',
          'In case of fire involving hazardous materials, evacuate and call the fire department. Do not attempt to fight a chemical fire unless you have been specifically trained to do so and have the appropriate equipment. The Safety Data Sheet Section 5 contains important information for firefighters, including suitable extinguishing media and special hazards. Make SDSs available to emergency responders when they arrive. After any emergency, participate in the incident investigation and review of procedures. Emergencies provide important learning opportunities to prevent future incidents. Finally, know where to find emergency equipment such as eyewash stations, safety showers, spill kits, and fire extinguishers, and know how to use them before you need them.'
        ]
      }
    ],
    keyFacts: [
      'Workers have three fundamental rights: the right to know, the right to participate, and the right to refuse unsafe work',
      'Workers must participate in WHMIS training, follow safe work procedures, use required PPE, and report hazards',
      'Employers must provide training, ensure labels and SDSs are available, provide PPE at no cost, and establish emergency procedures',
      'You cannot be disciplined or punished for exercising the right to refuse unsafe work in good faith',
      'In emergencies involving hazardous materials, prioritize safety, evacuate if necessary, and report the emergency immediately'
    ]
  }
];

/**
 * Quiz Questions
 */
export const quizQuestions: WHMISQuestion[] = [
  // Module 1: Introduction to WHMIS 2015
  {
    id: 1,
    moduleId: 1,
    question: 'What does WHMIS stand for?',
    options: [
      'Workplace Hazard Management Information System',
      'Workplace Hazardous Materials Information System',
      'Worker Health and Material Identification System',
      'Workplace Hazardous Material Inspection Standards'
    ],
    correctAnswer: 1,
    explanation: 'WHMIS stands for Workplace Hazardous Materials Information System. It is Canada\'s national hazard communication standard that provides information about hazardous materials used in Canadian workplaces.'
  },
  {
    id: 2,
    moduleId: 1,
    question: 'What are the three key elements of WHMIS 2015?',
    options: [
      'Training, supervision, and enforcement',
      'Labels, safety data sheets, and education/training',
      'Hazard assessment, control measures, and monitoring',
      'Identification, classification, and documentation'
    ],
    correctAnswer: 1,
    explanation: 'The three key elements of WHMIS 2015 are labels (on product containers), safety data sheets (detailed technical information), and education and training (so workers understand the information). All three elements must work together for WHMIS to be effective.'
  },
  {
    id: 3,
    moduleId: 1,
    question: 'WHMIS 2015 aligned Canada with which international system?',
    options: [
      'International Chemical Safety Standards (ICSS)',
      'Global Material Safety Protocol (GMSP)',
      'Globally Harmonized System (GHS)',
      'World Health Organization Standards (WHOS)'
    ],
    correctAnswer: 2,
    explanation: 'WHMIS 2015 aligned Canada with the Globally Harmonized System of Classification and Labelling of Chemicals (GHS). This ensures that Canadian hazard communication is consistent with over 70 other countries worldwide.'
  },
  {
    id: 4,
    moduleId: 1,
    question: 'Who is responsible for classifying hazardous products under WHMIS?',
    options: [
      'The employer at each workplace',
      'Government health and safety inspectors',
      'Suppliers (manufacturers or importers)',
      'Workers who handle the products'
    ],
    correctAnswer: 2,
    explanation: 'Suppliers (manufacturers or importers) are responsible for classifying hazardous products according to WHMIS 2015 criteria. They must evaluate test data and scientific information to determine the product\'s classification before it is sold or imported.'
  },

  // Module 2: Hazard Classification
  {
    id: 5,
    moduleId: 2,
    question: 'What are the two main groups of hazards in WHMIS 2015?',
    options: [
      'Chemical and biological hazards',
      'Physical and health hazards',
      'Acute and chronic hazards',
      'Environmental and occupational hazards'
    ],
    correctAnswer: 1,
    explanation: 'WHMIS 2015 classifies hazards into two main groups: physical hazards (related to chemical/physical properties like flammability) and health hazards (related to adverse health effects from exposure).'
  },
  {
    id: 6,
    moduleId: 2,
    question: 'In WHMIS hazard classification, what does Category 1 typically indicate?',
    options: [
      'The lowest level of hazard',
      'The most severe hazard',
      'A moderate level of hazard',
      'An unclassified hazard'
    ],
    correctAnswer: 1,
    explanation: 'Category 1 typically indicates the most severe hazard within a hazard class. Lower category numbers represent more severe hazards, though not all hazard classes use the same numbering system.'
  },
  {
    id: 7,
    moduleId: 2,
    question: 'Which of the following is a physical hazard?',
    options: [
      'Carcinogenicity',
      'Respiratory sensitization',
      'Flammable liquids',
      'Reproductive toxicity'
    ],
    correctAnswer: 2,
    explanation: 'Flammable liquids is a physical hazard class related to the product\'s chemical properties. The other options (carcinogenicity, respiratory sensitization, and reproductive toxicity) are all health hazards.'
  },

  // Module 3: WHMIS Pictograms
  {
    id: 8,
    moduleId: 3,
    question: 'How many pictograms are used in WHMIS 2015?',
    options: [
      'Six pictograms',
      'Eight pictograms',
      'Nine pictograms',
      'Twelve pictograms'
    ],
    correctAnswer: 2,
    explanation: 'WHMIS 2015 uses nine pictograms from the GHS system. Each pictogram represents specific hazard classes and appears as a black symbol on white background within a red diamond border.'
  },
  {
    id: 9,
    moduleId: 3,
    question: 'What does the skull and crossbones pictogram indicate?',
    options: [
      'Corrosive materials',
      'Acute toxicity (fatal or toxic)',
      'Biohazardous materials',
      'Materials that cause serious long-term health effects'
    ],
    correctAnswer: 1,
    explanation: 'The skull and crossbones pictogram indicates acute toxicity, meaning the product can cause serious poisoning or death after a single exposure or multiple exposures over a short period. These are highly toxic materials.'
  },
  {
    id: 10,
    moduleId: 3,
    question: 'What color is the border of WHMIS pictograms?',
    options: [
      'Black',
      'Yellow',
      'Red',
      'Orange'
    ],
    correctAnswer: 2,
    explanation: 'WHMIS pictograms have a red diamond border. This distinctive red border immediately draws attention and signals that the product presents a hazard.'
  },
  {
    id: 11,
    moduleId: 3,
    question: 'Which pictogram indicates that a product is an oxidizer?',
    options: [
      'Flame',
      'Flame over circle',
      'Gas cylinder',
      'Exploding bomb'
    ],
    correctAnswer: 1,
    explanation: 'The flame over circle pictogram indicates oxidizing materials. These products can cause or intensify fires by providing oxygen, even though they do not burn themselves.'
  },

  // Module 4: Supplier & Workplace Labels
  {
    id: 12,
    moduleId: 4,
    question: 'How many required elements must appear on a supplier label?',
    options: [
      'Three elements',
      'Four elements',
      'Six elements',
      'Eight elements'
    ],
    correctAnswer: 2,
    explanation: 'A supplier label must include six required elements: product identifier, initial supplier identifier, pictograms, signal word, hazard statements, and precautionary statements.'
  },
  {
    id: 13,
    moduleId: 4,
    question: 'When is a workplace label required?',
    options: [
      'Only when the supplier label is damaged or illegible',
      'When a hazardous product is transferred to a different container',
      'Only for products produced at the workplace',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'A workplace label is required in several situations: when transferring a product to a different container (unless for immediate use), when the supplier label is damaged or illegible, when a product is produced and used at the workplace, and in certain other circumstances.'
  },
  {
    id: 14,
    moduleId: 4,
    question: 'What are the three required elements of a workplace label?',
    options: [
      'Product name, pictograms, and expiry date',
      'Product identifier, pictograms, and supplier name',
      'Product identifier, safe handling information, and reference to SDS',
      'Hazard statements, precautionary statements, and emergency number'
    ],
    correctAnswer: 2,
    explanation: 'A workplace label must include three elements: product identifier, safe handling information, and a reference to the safety data sheet. While including pictograms is permitted and helpful, it is not required on workplace labels.'
  },
  {
    id: 15,
    moduleId: 4,
    question: 'What is the purpose of the hatched border on WHMIS labels?',
    options: [
      'It indicates the product is extremely hazardous',
      'It distinguishes WHMIS labels from other labels on containers',
      'It shows the product requires refrigeration',
      'It means the label must be replaced annually'
    ],
    correctAnswer: 1,
    explanation: 'The hatched border (solid outline) helps distinguish WHMIS labels from other labels and markings that might appear on containers. It is required on supplier labels but not on workplace labels.'
  },

  // Module 5: Safety Data Sheets (SDS)
  {
    id: 16,
    moduleId: 5,
    question: 'How many sections does a Safety Data Sheet have?',
    options: [
      '9 sections',
      '12 sections',
      '16 sections',
      '20 sections'
    ],
    correctAnswer: 2,
    explanation: 'All Safety Data Sheets under WHMIS 2015 must follow a standardized 16-section format. Having the same information in the same section for every product makes it much easier to find the information you need.'
  },
  {
    id: 17,
    moduleId: 5,
    question: 'Which section of the SDS tells you what personal protective equipment to use?',
    options: [
      'Section 4: First-Aid Measures',
      'Section 6: Accidental Release Measures',
      'Section 8: Exposure Controls/Personal Protection',
      'Section 11: Toxicological Information'
    ],
    correctAnswer: 2,
    explanation: 'Section 8, Exposure Controls/Personal Protection, specifies required personal protective equipment including eye/face protection, hand protection, respiratory protection, and other PPE appropriate for the product\'s hazards.'
  },
  {
    id: 18,
    moduleId: 5,
    question: 'What was the previous name for Safety Data Sheets before WHMIS 2015?',
    options: [
      'Product Safety Information (PSI)',
      'Chemical Safety Records (CSR)',
      'Material Safety Data Sheets (MSDS)',
      'Hazard Information Documents (HID)'
    ],
    correctAnswer: 2,
    explanation: 'Before WHMIS 2015, these documents were called Material Safety Data Sheets (MSDS). The name changed to Safety Data Sheets (SDS) and the format was standardized to 16 sections.'
  },
  {
    id: 19,
    moduleId: 5,
    question: 'How often must suppliers update an SDS when they receive new hazard information?',
    options: [
      'Within 30 days',
      'Within 90 days',
      'Within six months',
      'Within one year'
    ],
    correctAnswer: 1,
    explanation: 'Suppliers must update a Safety Data Sheet within 90 days of becoming aware of any new hazard information. Employers must replace older SDSs with updated versions to ensure workers have current information.'
  },

  // Module 6: Personal Protective Equipment
  {
    id: 20,
    moduleId: 6,
    question: 'Where does personal protective equipment (PPE) fall in the hierarchy of hazard controls?',
    options: [
      'First line of defense (most preferred)',
      'Second line of defense',
      'Third line of defense',
      'Last line of defense (least preferred)'
    ],
    correctAnswer: 3,
    explanation: 'PPE is the last line of defense in the hierarchy of controls. Elimination, substitution, engineering controls, and administrative controls should be implemented first. PPE is important but should not be the only control measure.'
  },
  {
    id: 21,
    moduleId: 6,
    question: 'Why is it important to consult the SDS when selecting chemical-resistant gloves?',
    options: [
      'All gloves provide the same level of protection',
      'Different glove materials protect against different chemicals',
      'The SDS tells you what size gloves to wear',
      'Gloves are not mentioned in the SDS'
    ],
    correctAnswer: 1,
    explanation: 'Different glove materials (nitrile, neoprene, PVC, butyl rubber, etc.) protect against different chemicals. Section 8 of the SDS specifies appropriate glove materials for each product because using the wrong material can provide little or no protection.'
  },
  {
    id: 22,
    moduleId: 6,
    question: 'When should you inspect your personal protective equipment?',
    options: [
      'Once per week',
      'Once per month',
      'Before each use',
      'Only when you notice visible damage'
    ],
    correctAnswer: 2,
    explanation: 'Personal protective equipment must be inspected before each use. Check for damage, wear, or contamination. Damaged or defective PPE will not provide adequate protection and must be removed from service immediately.'
  },

  // Module 7: Worker Rights & Responsibilities
  {
    id: 23,
    moduleId: 7,
    question: 'What are the three fundamental worker rights in Canadian occupational health and safety?',
    options: [
      'Right to training, right to compensation, right to breaks',
      'Right to know, right to participate, right to refuse unsafe work',
      'Right to privacy, right to fair wages, right to benefits',
      'Right to supervision, right to equipment, right to insurance'
    ],
    correctAnswer: 1,
    explanation: 'The three fundamental worker rights are: the right to know about hazards, the right to participate in health and safety activities, and the right to refuse work that you believe is unsafe. These rights are protected by law.'
  },
  {
    id: 24,
    moduleId: 7,
    question: 'Can an employer discipline a worker for refusing unsafe work?',
    options: [
      'Yes, refusal to work can always result in discipline',
      'No, workers can refuse any work they find difficult',
      'No, if the worker exercises the right to refuse in good faith based on reasonable grounds',
      'Yes, unless the worker is a member of a union'
    ],
    correctAnswer: 2,
    explanation: 'Employers cannot discipline, penalize, or punish workers for exercising the right to refuse unsafe work in good faith based on reasonable grounds. This right is protected by law, but it must be based on genuine safety concerns.'
  },
  {
    id: 25,
    moduleId: 7,
    question: 'What should you do if you discover a hazardous product with a damaged or missing label?',
    options: [
      'Continue using the product carefully',
      'Try to guess what the product is based on appearance',
      'Report it to your supervisor immediately and do not use it',
      'Create your own label based on what you think it contains'
    ],
    correctAnswer: 2,
    explanation: 'If you find a damaged or missing label, report it to your supervisor immediately and do not use the product until a proper label is in place. Using unlabeled or inadequately labeled products is unsafe because you do not know the hazards or how to protect yourself.'
  }
];

/**
 * Helper function to get a module by ID
 */
export function getModuleById(id: number): WHMISModule | undefined {
  return whmisModules.find(module => module.id === id);
}

/**
 * Helper function to get quiz questions
 * @param count - Number of questions to return (default: all questions, shuffled)
 * @returns Array of quiz questions
 */
export function getQuizQuestions(count?: number): WHMISQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
}

/**
 * Helper function to get a pictogram by ID
 */
export function getPictogramById(id: string): WHMISPictogram | undefined {
  return whmisPictograms.find(pictogram => pictogram.id === id);
}

/**
 * Helper function to get all questions for a specific module
 */
export function getQuestionsByModuleId(moduleId: number): WHMISQuestion[] {
  return quizQuestions.filter(q => q.moduleId === moduleId);
}

/**
 * Helper function to calculate total course duration
 */
export function getTotalCourseDuration(): number {
  return whmisModules.reduce((total, module) => total + module.estimatedMinutes, 0);
}

/**
 * Helper function to get modules in order
 */
export function getModulesInOrder(): WHMISModule[] {
  return [...whmisModules].sort((a, b) => a.order - b.order);
}
