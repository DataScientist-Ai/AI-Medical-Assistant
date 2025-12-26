// ENT Medical Knowledge Base
// Extracted from script.js for server-side use

const entKnowledgeBase = {
    diseases: {
        // EAR CONDITIONS
        otitisMedia: {
            name: "Otitis Media",
            category: "Ear",
            symptoms: ["Ear pain", "Fluid drainage", "Hearing loss", "Fever", "Irritability in children", "Balance problems"],
            causes: ["Bacterial infection", "Viral infection", "Eustachian tube dysfunction", "Upper respiratory infections"],
            riskFactors: ["Young age", "Group childcare", "Bottle feeding", "Allergies", "Smoking exposure"],
            treatment: ["Antibiotics (for bacterial infections)", "Pain relievers", "Ear drops", "Ear tubes for chronic cases"],
            prevention: ["Breastfeeding", "Avoid bottle propping", "Hand hygiene", "Vaccination"]
        },
        otitisExterna: {
            name: "Otitis Externa (Swimmer's Ear)",
            category: "Ear",
            symptoms: ["Ear pain", "Itching in ear canal", "Redness", "Discharge", "Temporary hearing loss"],
            causes: ["Bacterial infection", "Fungal infection", "Water exposure", "Mechanical trauma"],
            riskFactors: ["Swimming", "Humid climate", "Earwax removal", "Hearing aid use"],
            treatment: ["Antibiotic ear drops", "Antifungal drops", "Pain medication", "Keep ear dry"],
            prevention: ["Dry ears after swimming", "Avoid inserting objects", "Use earplugs when swimming"]
        },
        tinnitus: {
            name: "Tinnitus",
            category: "Ear",
            symptoms: ["Ringing in ears", "Buzzing", "Hissing", "Clicking", "May worsen in quiet"],
            causes: ["Noise exposure", "Age-related hearing loss", "Ear injury", "Medications", "Meniere's disease"],
            riskFactors: ["Loud noise exposure", "Age over 60", "Male gender", "Cardiovascular disease"],
            treatment: ["Sound therapy", "Hearing aids", "Cognitive behavioral therapy", "Medications for underlying causes"],
            prevention: ["Protect hearing", "Limit loud noise", "Manage cardiovascular health"]
        },
        hearingLoss: {
            name: "Hearing Loss",
            category: "Ear",
            symptoms: ["Difficulty hearing", "Asking for repetition", "Muffled sounds", "Difficulty with conversations"],
            causes: ["Age", "Noise exposure", "Ear infections", "Genetic factors", "Medications"],
            riskFactors: ["Advanced age", "Occupational noise", "Genetics", "Certain diseases"],
            treatment: ["Hearing aids", "Cochlear implants", "Remove earwax", "Surgery for specific causes"],
            prevention: ["Protect from loud noise", "Regular hearing tests", "Avoid ototoxic medications"]
        },
        vertigo: {
            name: "Vertigo",
            category: "Ear",
            symptoms: ["Spinning sensation", "Nausea", "Balance problems", "Sweating", "Abnormal eye movements"],
            causes: ["BPPV", "Meniere's disease", "Vestibular neuritis", "Head injury", "Migraine"],
            riskFactors: ["Age", "Head trauma", "Inner ear infection", "Stroke"],
            treatment: ["Epley maneuver", "Medications", "Vestibular rehabilitation", "Surgery in severe cases"],
            prevention: ["Fall prevention", "Manage underlying conditions"]
        },
        meniere: {
            name: "Meniere's Disease",
            category: "Ear",
            symptoms: ["Vertigo episodes", "Hearing loss", "Tinnitus", "Ear fullness", "Nausea"],
            causes: ["Fluid buildup in inner ear", "Exact cause unknown", "Poor drainage", "Immune response"],
            riskFactors: ["Age 40-60", "Family history", "Autoimmune disorders", "Allergies"],
            treatment: ["Diuretics", "Low-salt diet", "Medications for vertigo", "Surgery in severe cases"],
            prevention: ["Low-salt diet", "Stress management", "Avoid triggers"]
        },
        eustachianDysfunction: {
            name: "Eustachian Tube Dysfunction",
            category: "Ear",
            symptoms: ["Ear fullness", "Hearing changes", "Ear pain", "Clicking sounds", "Balance issues"],
            causes: ["Allergies", "Sinus infections", "Common cold", "Enlarged adenoids"],
            riskFactors: ["Allergies", "Smoking", "Obesity", "Recent respiratory infection"],
            treatment: ["Decongestants", "Antihistamines", "Nasal steroids", "Ear tubes", "Surgery"],
            prevention: ["Manage allergies", "Avoid smoke", "Stay hydrated"]
        },
        perforatedEardrum: {
            name: "Perforated Eardrum",
            category: "Ear",
            symptoms: ["Ear pain", "Drainage", "Hearing loss", "Ringing", "Vertigo"],
            causes: ["Infection", "Trauma", "Loud noise", "Pressure changes"],
            riskFactors: ["Ear infections", "Injury", "Barotrauma"],
            treatment: ["Usually heals on own", "Antibiotics", "Patch procedure", "Surgery if needed"],
            prevention: ["Treat infections", "Protect ears", "Avoid inserting objects"]
        },

        // NOSE CONDITIONS
        sinusitis: {
            name: "Sinusitis",
            category: "Nose",
            symptoms: ["Facial pain/pressure", "Nasal congestion", "Thick discharge", "Reduced smell", "Cough", "Headache", "Fever"],
            causes: ["Viral infection", "Bacterial infection", "Allergies", "Nasal polyps", "Deviated septum"],
            riskFactors: ["Allergies", "Asthma", "Structural abnormalities", "Immune deficiency"],
            treatment: ["Saline rinses", "Nasal corticosteroids", "Antibiotics (bacterial)", "Decongestants", "Surgery for chronic cases"],
            prevention: ["Hand hygiene", "Manage allergies", "Humidifier use", "Avoid smoke"]
        },
        allergicRhinitis: {
            name: "Allergic Rhinitis (Hay Fever)",
            category: "Nose",
            symptoms: ["Sneezing", "Runny nose", "Itchy eyes/nose", "Congestion", "Postnasal drip"],
            causes: ["Pollen", "Dust mites", "Pet dander", "Mold"],
            riskFactors: ["Family history", "Other allergies", "Asthma", "Eczema"],
            treatment: ["Antihistamines", "Nasal corticosteroids", "Decongestants", "Immunotherapy"],
            prevention: ["Avoid allergens", "Air filters", "Keep windows closed", "Regular cleaning"]
        },
        nasalPolyps: {
            name: "Nasal Polyps",
            category: "Nose",
            symptoms: ["Nasal blockage", "Loss of smell", "Runny nose", "Facial pressure", "Snoring"],
            causes: ["Chronic inflammation", "Asthma", "Aspirin sensitivity", "Cystic fibrosis"],
            riskFactors: ["Asthma", "Aspirin sensitivity", "Allergies", "Age"],
            treatment: ["Nasal corticosteroids", "Oral steroids", "Surgery", "Biologics"],
            prevention: ["Manage allergies/asthma", "Avoid irritants", "Use humidifier"]
        },
        deviatedSeptum: {
            name: "Deviated Septum",
            category: "Nose",
            symptoms: ["Nasal congestion", "Nosebleeds", "Facial pain", "Noisy breathing", "Snoring"],
            causes: ["Congenital", "Injury", "Trauma during childbirth"],
            riskFactors: ["Birth trauma", "Nasal injury", "Contact sports"],
            treatment: ["Decongestants", "Antihistamines", "Nasal strips", "Septoplasty surgery"],
            prevention: ["Protect nose from injury", "Use protective gear in sports"]
        },
        epistaxis: {
            name: "Epistaxis (Nosebleeds)",
            category: "Nose",
            symptoms: ["Bleeding from nose", "Blood in throat", "May be anterior or posterior"],
            causes: ["Dry air", "Nose picking", "Trauma", "Medications", "Bleeding disorders"],
            riskFactors: ["Dry climate", "Blood thinners", "Hypertension", "Nasal allergies"],
            treatment: ["Lean forward", "Pinch nose", "Ice pack", "Nasal packing", "Cauterization"],
            prevention: ["Humidify air", "Saline spray", "Avoid picking", "Manage blood pressure"]
        },

        // THROAT CONDITIONS
        tonsillitis: {
            name: "Tonsillitis",
            category: "Throat",
            symptoms: ["Sore throat", "Swollen tonsils", "White/yellow patches", "Fever", "Difficulty swallowing", "Swollen neck glands"],
            causes: ["Viral infection", "Bacterial infection (Strep)", "Epstein-Barr virus"],
            riskFactors: ["Young age", "Frequent throat infections", "Close contact with infected"],
            treatment: ["Rest", "Fluids", "Pain relievers", "Antibiotics (bacterial)", "Tonsillectomy (recurrent)"],
            prevention: ["Hand hygiene", "Avoid sharing utensils", "Avoid sick contacts"]
        },
        strepThroat: {
            name: "Strep Throat",
            category: "Throat",
            symptoms: ["Severe sore throat", "Pain swallowing", "Fever", "Red tonsils with white patches", "Swollen lymph nodes"],
            causes: ["Streptococcus pyogenes bacteria"],
            riskFactors: ["Age 5-15", "Close contact", "Winter/early spring"],
            treatment: ["Antibiotics (Penicillin/Amoxicillin)", "Pain relievers", "Rest", "Fluids"],
            prevention: ["Hand hygiene", "Avoid sharing items", "Cover coughs"]
        },
        laryngitis: {
            name: "Laryngitis",
            category: "Throat",
            symptoms: ["Hoarse voice", "Weak voice", "Sore throat", "Dry throat", "Cough"],
            causes: ["Viral infection", "Voice overuse", "GERD", "Smoking", "Irritants"],
            riskFactors: ["Voice overuse", "Smoking", "Alcohol", "GERD"],
            treatment: ["Voice rest", "Humidifier", "Fluids", "Avoid irritants", "Treat underlying cause"],
            prevention: ["Avoid yelling", "Stay hydrated", "Avoid smoking", "Manage GERD"]
        },
        sleepApnea: {
            name: "Sleep Apnea",
            category: "Throat",
            symptoms: ["Loud snoring", "Breathing pauses", "Gasping for air", "Daytime fatigue", "Morning headache"],
            causes: ["Airway obstruction", "Obesity", "Enlarged tonsils", "Neuromuscular issues"],
            riskFactors: ["Obesity", "Large neck", "Male gender", "Age", "Family history"],
            treatment: ["CPAP machine", "Weight loss", "Oral appliances", "Surgery", "Positional therapy"],
            prevention: ["Maintain healthy weight", "Avoid alcohol", "Sleep on side", "Quit smoking"]
        },
        gerd: {
            name: "Laryngopharyngeal Reflux (GERD)",
            category: "Throat",
            symptoms: ["Hoarseness", "Throat clearing", "Chronic cough", "Sore throat", "Lump sensation"],
            causes: ["Stomach acid reflux", "Lower esophageal sphincter dysfunction"],
            riskFactors: ["Obesity", "Smoking", "Alcohol", "Certain foods", "Hiatal hernia"],
            treatment: ["Proton pump inhibitors", "H2 blockers", "Dietary changes", "Elevate head", "Weight loss"],
            prevention: ["Avoid trigger foods", "Small meals", "Don't lie down after eating", "Weight management"]
        },
        voiceDisorders: {
            name: "Voice Disorders",
            category: "Throat",
            symptoms: ["Hoarseness", "Vocal fatigue", "Voice breaks", "Breathy voice", "Strain while speaking"],
            causes: ["Vocal cord nodules", "Polyps", "Laryngitis", "Neurological conditions", "Overuse"],
            riskFactors: ["Voice overuse", "Smoking", "GERD", "Teaching/singing profession"],
            treatment: ["Voice therapy", "Surgery for lesions", "Medications", "Voice rest"],
            prevention: ["Proper voice technique", "Stay hydrated", "Avoid yelling", "Vocal warm-ups"]
        },
        pharyngitis: {
            name: "Pharyngitis",
            category: "Throat",
            symptoms: ["Sore throat", "Pain swallowing", "Fever", "Headache", "Red throat"],
            causes: ["Viral infection", "Bacterial infection", "Allergies", "Irritants"],
            riskFactors: ["Close contact", "Weakened immunity", "Allergies", "Smoke exposure"],
            treatment: ["Rest", "Fluids", "Pain relievers", "Antibiotics (bacterial)", "Throat lozenges"],
            prevention: ["Hand hygiene", "Avoid sick contacts", "Don't share utensils"]
        }
    },

    medications: {
        // ANTIBIOTICS
        amoxicillin: {
            name: "Amoxicillin",
            category: "Antibiotic",
            usage: "Treatment of bacterial ENT infections including otitis media, sinusitis, strep throat",
            dosage: "Adults: 500mg-875mg every 8-12 hours. Children: 20-40mg/kg/day divided doses",
            sideEffects: ["Diarrhea", "Nausea", "Rash", "Yeast infection"],
            contraindications: ["Penicillin allergy", "Mononucleosis"],
            interactions: ["Oral contraceptives", "Warfarin", "Methotrexate"]
        },
        amoxicillinClavulanate: {
            name: "Amoxicillin/Clavulanate (Augmentin)",
            category: "Antibiotic",
            usage: "Broader spectrum antibiotic for resistant bacterial infections, sinusitis, otitis media",
            dosage: "Adults: 500-875mg every 12 hours. Children: Based on amoxicillin component",
            sideEffects: ["Diarrhea", "Nausea", "Abdominal pain", "Rash"],
            contraindications: ["Penicillin allergy", "Liver dysfunction"],
            interactions: ["Warfarin", "Allopurinol", "Probenecid"]
        },
        penicillinV: {
            name: "Penicillin V",
            category: "Antibiotic",
            usage: "Streptococcal pharyngitis (strep throat), prevention of rheumatic fever",
            dosage: "Adults: 250-500mg every 6-8 hours. Children: 25-50mg/kg/day divided",
            sideEffects: ["Nausea", "Diarrhea", "Rash", "Black hairy tongue"],
            contraindications: ["Penicillin allergy"],
            interactions: ["Oral contraceptives", "Methotrexate"]
        },
        clindamycin: {
            name: "Clindamycin",
            category: "Antibiotic",
            usage: "Alternative for penicillin-allergic patients, dental infections, suppurative parotitis",
            dosage: "Adults: 150-450mg every 6-8 hours. Children: 8-25mg/kg/day divided",
            sideEffects: ["Diarrhea", "C. difficile colitis", "Nausea", "Rash"],
            contraindications: ["History of C. difficile colitis", "Severe liver disease"],
            interactions: ["Neuromuscular blockers", "Warfarin"]
        },
        cefalexin: {
            name: "Cefalexin (Cephalexin)",
            category: "Antibiotic",
            usage: "Streptococcal pharyngitis, skin infections, alternative to penicillin",
            dosage: "Adults: 250-500mg every 6-12 hours. Children: 25-50mg/kg/day divided",
            sideEffects: ["Diarrhea", "Nausea", "Rash", "Abdominal pain"],
            contraindications: ["Cephalosporin allergy", "Severe penicillin allergy"],
            interactions: ["Metformin", "Probenecid"]
        },
        ciprofloxacin: {
            name: "Ciprofloxacin",
            category: "Antibiotic",
            usage: "Otitis externa, chronic suppurative otitis media, sinusitis (resistant cases)",
            dosage: "Adults: 250-750mg every 12 hours. Not first-line in children",
            sideEffects: ["Nausea", "Diarrhea", "Tendon rupture", "QT prolongation"],
            contraindications: ["Age <18 (except specific cases)", "Tendon disorders", "Myasthenia gravis"],
            interactions: ["Antacids", "Warfarin", "Theophylline", "NSAIDs"]
        },

        // DECONGESTANTS (Oral)
        pseudoephedrine: {
            name: "Pseudoephedrine (Sudafed)",
            category: "Oral Decongestant",
            usage: "Nasal congestion, sinus pressure, Eustachian tube dysfunction",
            dosage: "Adults: 30-60mg every 4-6 hours or 120mg extended-release every 12 hours",
            sideEffects: ["Insomnia", "Nervousness", "Increased heart rate", "Elevated blood pressure"],
            contraindications: ["Severe hypertension", "MAO inhibitor use", "Severe coronary disease"],
            interactions: ["MAO inhibitors", "Antihypertensives", "Stimulants"]
        },
        phenylephrine: {
            name: "Phenylephrine (Sudafed PE)",
            category: "Oral Decongestant",
            usage: "Nasal congestion (less effective than pseudoephedrine)",
            dosage: "Adults: 10mg every 4 hours, max 60mg/day",
            sideEffects: ["Nervousness", "Dizziness", "Insomnia", "Headache"],
            contraindications: ["Severe hypertension", "MAO inhibitors"],
            interactions: ["MAO inhibitors", "Beta-blockers"]
        },

        // DECONGESTANTS (Topical)
        oxymetazoline: {
            name: "Oxymetazoline (Afrin)",
            category: "Nasal Decongestant Spray",
            usage: "Short-term nasal congestion relief",
            dosage: "2-3 sprays per nostril every 10-12 hours, max 3 days",
            sideEffects: ["Rebound congestion", "Burning", "Sneezing", "Dryness"],
            contraindications: ["Use >3 days (rebound risk)"],
            interactions: ["Minimal systemic interactions"]
        },
        salineSpray: {
            name: "Saline Nasal Spray",
            category: "Nasal Moisturizer",
            usage: "Nasal dryness, congestion relief, post-nasal surgery care",
            dosage: "Use as needed throughout day",
            sideEffects: ["Minimal", "Temporary stinging"],
            contraindications: ["None"],
            interactions: ["None"]
        },

        // NASAL CORTICOSTEROIDS
        fluticasone: {
            name: "Fluticasone (Flonase)",
            category: "Nasal Corticosteroid",
            usage: "Allergic rhinitis, nasal polyps, chronic sinusitis",
            dosage: "Adults: 1-2 sprays per nostril daily. Children 4+: 1 spray per nostril daily",
            sideEffects: ["Nosebleeds", "Nasal irritation", "Headache", "Sore throat"],
            contraindications: ["Recent nasal surgery", "Nasal ulcers", "Hypersensitivity"],
            interactions: ["Ritonavir (increases steroid levels)"]
        },
        triamcinolone: {
            name: "Triamcinolone (Nasacort)",
            category: "Nasal Corticosteroid",
            usage: "Allergic rhinitis, nasal congestion",
            dosage: "Adults: 2 sprays per nostril daily, then 1 spray. Children 2+: 1 spray daily",
            sideEffects: ["Nosebleeds", "Headache", "Pharyngitis", "Cough"],
            contraindications: ["Recent nasal trauma/surgery", "Hypersensitivity"],
            interactions: ["Minimal systemic interactions"]
        },
        mometasone: {
            name: "Mometasone (Nasonex)",
            category: "Nasal Corticosteroid",
            usage: "Allergic rhinitis, nasal polyps, sinusitis",
            dosage: "Adults: 2 sprays per nostril daily. Children 2+: 1 spray per nostril daily",
            sideEffects: ["Headache", "Nosebleeds", "Pharyngitis", "Upper respiratory infection"],
            contraindications: ["Recent nasal surgery", "Untreated infection"],
            interactions: ["Ketoconazole (increases levels)"]
        },

        // ANTIHISTAMINES
        loratadine: {
            name: "Loratadine (Claritin)",
            category: "Non-sedating Antihistamine",
            usage: "Allergic rhinitis, chronic urticaria",
            dosage: "Adults/Children 6+: 10mg once daily",
            sideEffects: ["Headache", "Dry mouth", "Fatigue", "Drowsiness (rare)"],
            contraindications: ["Hypersensitivity"],
            interactions: ["Minimal", "Ketoconazole increases levels"]
        },
        cetirizine: {
            name: "Cetirizine (Zyrtec)",
            category: "Non-sedating Antihistamine",
            usage: "Allergic rhinitis, chronic urticaria, post-nasal drip",
            dosage: "Adults/Children 6+: 5-10mg once daily",
            sideEffects: ["Drowsiness", "Dry mouth", "Fatigue", "Dizziness"],
            contraindications: ["Severe renal impairment", "Hypersensitivity"],
            interactions: ["Theophylline", "Ritonavir"]
        },
        levocetirizine: {
            name: "Levocetirizine (Xyzal)",
            category: "Non-sedating Antihistamine",
            usage: "Allergic rhinitis, chronic urticaria",
            dosage: "Adults/Children 6+: 5mg once daily in evening",
            sideEffects: ["Drowsiness", "Fatigue", "Dry mouth", "Nasopharyngitis"],
            contraindications: ["End-stage renal disease", "Hemodialysis"],
            interactions: ["Ritonavir", "Theophylline"]
        },
        diphenhydramine: {
            name: "Diphenhydramine (Benadryl)",
            category: "Sedating Antihistamine",
            usage: "Allergic reactions, sleep aid, motion sickness",
            dosage: "Adults: 25-50mg every 4-6 hours. Children: 5mg/kg/day divided",
            sideEffects: ["Drowsiness", "Dry mouth", "Dizziness", "Urinary retention"],
            contraindications: ["Acute asthma", "Glaucoma", "Prostatic hypertrophy"],
            interactions: ["CNS depressants", "MAO inhibitors", "Anticholinergics"]
        },

        // OTOLOGIC DROPS
        neomycinDrops: {
            name: "Neomycin/Polymyxin B/Hydrocortisone Ear Drops",
            category: "Antibiotic Ear Drops",
            usage: "Otitis externa, infected eczematous dermatitis of ear canal",
            dosage: "4 drops in affected ear 3-4 times daily for 7-10 days",
            sideEffects: ["Local irritation", "Ototoxicity (if eardrum perforated)", "Allergic reaction"],
            contraindications: ["Perforated eardrum", "Viral infections"],
            interactions: ["None significant (topical use)"]
        },
        ofloxacinOtic: {
            name: "Ofloxacin Otic",
            category: "Antibiotic Ear Drops",
            usage: "Otitis externa, chronic suppurative otitis media (safe with perforation)",
            dosage: "5-10 drops in affected ear 1-2 times daily for 7-14 days",
            sideEffects: ["Ear discomfort", "Itching", "Dizziness", "Taste changes"],
            contraindications: ["Hypersensitivity to quinolones"],
            interactions: ["Minimal (topical)"]
        },
        aceticAcid: {
            name: "Acetic Acid Ear Drops (2%)",
            category: "Antibacterial/Antifungal Ear Drops",
            usage: "Otitis externa (mild cases), fungal ear infections, prevention",
            dosage: "3-5 drops in affected ear 2-3 times daily",
            sideEffects: ["Burning", "Stinging", "Irritation"],
            contraindications: ["Perforated eardrum"],
            interactions: ["None"]
        },
        earwaxDrops: {
            name: "Carbamide Peroxide Ear Drops",
            category: "Cerumenolytic (Earwax Softener)",
            usage: "Earwax removal, cerumen impaction",
            dosage: "5-10 drops in affected ear twice daily for up to 4 days",
            sideEffects: ["Ear discomfort", "Effervescence sensation", "Irritation"],
            contraindications: ["Ear drainage", "Ear pain", "Perforated eardrum"],
            interactions: ["None"]
        }
    },

    diagnostics: {
        otoscopy: {
            name: "Otoscopy",
            category: "Ear Examination",
            purpose: "Visual examination of external ear canal and tympanic membrane (eardrum) to diagnose ear conditions",
            preparation: "No special preparation needed. Avoid cotton swabs before exam",
            procedure: "Otoscope inserted gently into ear canal. Doctor examines for infections, wax, perforations, fluid. Pneumatic otoscopy uses air puff to test eardrum movement",
            interpretation: "Normal: pearly gray eardrum, visible landmarks. Abnormal: red/bulging (infection), retracted (negative pressure), perforation, fluid levels",
            risks: "Minimal - slight discomfort, rarely minor trauma if patient moves"
        },
        laryngoscopy: {
            name: "Laryngoscopy",
            category: "Throat Examination",
            purpose: "Examine larynx (voice box), vocal cords, throat structures to diagnose voice problems, throat pain, breathing issues",
            preparation: "Avoid eating 2+ hours before (flexible/rigid). May use numbing spray",
            procedure: "Indirect: mirror in throat. Flexible: thin scope through nose. Rigid: wider scope through mouth (general anesthesia)",
            interpretation: "Assesses vocal cord movement, lesions, inflammation, tumors, structural abnormalities",
            risks: "Gagging, sore throat, nosebleed (flexible), breathing issues (rare), aspiration (rare)"
        },
        audiometry: {
            name: "Audiometry",
            category: "Hearing Test",
            purpose: "Measure hearing ability across different frequencies and volumes. Diagnose type and severity of hearing loss",
            preparation: "Avoid loud noise 24 hours before. Clean ears of wax",
            procedure: "Soundproof room. Wear headphones. Respond to tones at various pitches/volumes. Speech testing. Bone conduction testing. Results plotted on audiogram",
            interpretation: "Pure-tone: measures frequency response. Bone conduction: differentiates conductive vs sensorineural loss. Speech: assesses word recognition",
            risks: "None - completely non-invasive"
        },
        tympanometry: {
            name: "Tympanometry",
            category: "Middle Ear Test",
            purpose: "Assess middle ear function, eardrum mobility, detect fluid, diagnose Eustachian tube problems",
            preparation: "Remove hearing aids. Ear canal should be clear of wax",
            procedure: "Small probe in ear canal creating seal. Air pressure varied while tone played. Microphone measures eardrum movement. Creates tympanogram graph",
            interpretation: "Type A: normal. Type B: flat (fluid/perforation). Type C: negative pressure (Eustachian dysfunction). Type As/Ad: abnormal stiffness/flaccidity",
            risks: "None - painless, quick (1-2 minutes per ear)"
        },
        nasalEndoscopy: {
            name: "Nasal Endoscopy",
            category: "Nose Examination",
            purpose: "Detailed examination of nasal passages, sinuses, nasopharynx. Diagnose chronic sinusitis, polyps, tumors, structural issues",
            preparation: "Avoid eating 2 hours before (if sedation used). Decongestant spray may be given",
            procedure: "Thin flexible endoscope inserted through nostril. Camera provides detailed view. May use anesthetic spray. Takes 5-10 minutes",
            interpretation: "Identifies polyps, deviated septum, tumors, inflammation, adenoid problems, sinus drainage issues",
            risks: "Minor discomfort, nosebleed (rare), vasovagal reaction (rare)"
        },
        ctScan: {
            name: "CT Scan (Sinus/Temporal Bone)",
            category: "Imaging",
            purpose: "Detailed imaging of sinuses, temporal bones, ear structures. Diagnose chronic sinusitis, fractures, cholesteatoma, tumors",
            preparation: "Remove metal objects. May need contrast (requires fasting). Inform if pregnant",
            procedure: "Lie still on table that slides through CT scanner. Quick scan (5-10 minutes). May use contrast dye for enhanced images",
            interpretation: "Shows bone structures, air-fluid levels, soft tissue masses, anatomical detail. Radiologist interprets",
            risks: "Radiation exposure (low), allergic reaction to contrast (rare), claustrophobia"
        },
        mriScan: {
            name: "MRI Scan (Head/Neck)",
            category: "Imaging",
            purpose: "Detailed soft tissue imaging. Diagnose acoustic neuromas, inner ear disorders, soft tissue masses, vascular issues",
            preparation: "Remove all metal. Inform about implants/pacemakers. May need contrast. Fasting if contrast used",
            procedure: "Lie in MRI machine (30-60 minutes). Very loud - earplugs provided. Must remain still. No radiation",
            interpretation: "Excellent soft tissue detail. Shows nerves, blood vessels, tumors, inflammation. Radiologist interprets",
            risks: "Claustrophobia, contrast reaction (rare), metal implant issues, noise discomfort"
        },
        allergyTesting: {
            name: "Allergy Testing",
            category: "Allergy Assessment",
            purpose: "Identify specific allergens causing rhinitis, asthma, or other allergic reactions",
            preparation: "Stop antihistamines 3-7 days before. Avoid certain medications as advised",
            procedure: "Skin prick test: small amounts of allergens on forearm/back. Observe for reactions (15-20 min). Blood test (RAST/ImmunoCAP): measures IgE antibodies",
            interpretation: "Positive skin test: wheal/redness at site. Blood test: elevated IgE to specific allergens indicates allergy",
            risks: "Itching, redness (skin test), rare anaphylaxis, discomfort from multiple pricks"
        },
        balanceTesting: {
            name: "Balance Testing (VNG/ENG)",
            category: "Vestibular Assessment",
            purpose: "Evaluate inner ear balance function, diagnose vertigo causes, vestibular disorders",
            preparation: "Avoid alcohol 48 hours before. No makeup/lotions. Certain medications may need stopping",
            procedure: "Videonystagmography (VNG) or Electronystagmography (ENG). Eye movement tracking. Caloric testing (warm/cool air/water in ear). Positional testing",
            interpretation: "Assesses nystagmus patterns, vestibular response, identifies affected ear, differentiates central vs peripheral causes",
            risks: "Temporary dizziness/nausea, discomfort during caloric test"
        },
        throatCulture: {
            name: "Throat Culture",
            category: "Laboratory Test",
            purpose: "Identify bacterial cause of throat infection, especially Streptococcus (strep throat)",
            preparation: "Avoid antibiotics before test. No eating/drinking 1 hour before",
            procedure: "Swab rubbed on back of throat and tonsils. Sample sent to lab. Rapid strep test (10-15 min) or culture (24-48 hours)",
            interpretation: "Positive rapid test: treat immediately. Positive culture: confirms bacterial infection. Negative: likely viral",
            risks: "Gagging, minor discomfort, no significant risks"
        },
        sleepStudy: {
            name: "Polysomnography (Sleep Study)",
            category: "Sleep Assessment",
            purpose: "Diagnose sleep apnea, evaluate sleep-related breathing disorders, assess sleep quality",
            preparation: "Avoid caffeine/alcohol day of test. Wash hair (no products). Bring comfortable sleepwear",
            procedure: "Overnight in sleep lab. Electrodes monitor brain waves, oxygen levels, heart rate, breathing, eye/leg movements. Video monitoring. Takes full night",
            interpretation: "AHI (Apnea-Hypopnea Index): <5 normal, 5-15 mild, 15-30 moderate, >30 severe sleep apnea. Assesses sleep stages, oxygen desaturation",
            risks: "None - non-invasive. Discomfort from electrodes, difficulty sleeping in lab"
        },
        nasopharyngoscopy: {
            name: "Nasopharyngoscopy",
            category: "Upper Airway Examination",
            purpose: "Examine nasopharynx, adenoids, view vocal cords in action during speech, assess velopharyngeal function",
            preparation: "Decongestant spray may be used. Local anesthetic spray possible",
            procedure: "Flexible endoscope through nose into throat. Patient may speak/swallow. Dynamic assessment of structures",
            interpretation: "Evaluates adenoid size, nasopharyngeal masses, vocal cord function, swallowing mechanism",
            risks: "Minor discomfort, nosebleed (rare), gagging"
        }
    }
};

module.exports = entKnowledgeBase;
