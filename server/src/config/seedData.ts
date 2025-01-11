export const seedNootropics = [
  {
    substanceName: "Piracetam",
    category: "Racetams",
    benefits: ["Memory enhancement", "Cognitive function", "Focus improvement"],
    potentialIQBoost: {
      minimum: 3,
      maximum: 8,
      description: "Moderate cognitive enhancement potential"
    },
    dosage: {
      minimum: 1200,
      maximum: 4800,
      unit: "mg",
      beginnerDose: 1600,
      advancedDose: 4800
    },
    doseTiming: {
      timesPerDay: 3,
      withFood: true,
      timeOfDay: ["morning", "afternoon", "evening"],
      betweenDoses: "4-6 hours"
    },
    howToTake: {
      method: "oral",
      instructions: "Take with water, preferably with meals",
      specialConsiderations: ["Start with lower dose", "Can be split throughout day"]
    },
    drugInteractions: [
      {
        substance: "Alcohol",
        severity: "mild",
        description: "May enhance effects of alcohol"
      }
    ],
    sideEffects: [
      {
        effect: "Headache",
        frequency: "common",
        severity: "mild",
        description: "Usually temporary and can be mitigated with choline supplementation"
      }
    ],
    moleculeStructure: {
      imageUrl: "/molecules/piracetam.svg",
      formula: "C6H10N2O2",
      description: "2-oxo-1-pyrrolidineacetamide"
    },
    potentialStacks: [
      {
        name: "Basic Stack",
        components: ["Piracetam", "Alpha GPC"],
        synergy: "Positive",
        description: "Classic combination for cognitive enhancement"
      }
    ],
    sources: [
      {
        vendor: "NootropicsDepot",
        url: "https://nootropicsdepot.com/piracetam/",
        reliability: "verified",
        region: ["USA", "International"]
      }
    ],
    references: [
      {
        title: "Piracetam - An Old Nootropic with Proven Efficacy",
        url: "https://pubmed.ncbi.nlm.nih.gov/example",
        type: "study"
      }
    ]
  }
]; 