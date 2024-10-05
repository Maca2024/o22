document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        { id: 'energy', text: 'Energie Niveau (0 = Laag, 10 = Hoog)' },
        { id: 'relaxation', text: 'Ontspanning (0 = Geen, 10 = Hoog)' },
        { id: 'wellbeing', text: 'Welzijn (0 = Geen, 10 = Hoog)' },
        { id: 'hoofdpijn', text: 'Hoofdpijn (haarwortel/druk/divers)' },
        { id: 'rugpijn', text: 'Rugpijn / Nekpijn' },
        { id: 'borstpijn', text: 'Pijn op de borst' },
        { id: 'brainfog', text: 'Brainfog / Duizeligheid' },
        { id: 'concentration', text: 'Concentratie / Geheugenproblemen' },
        { id: 'intolerance', text: 'Intolerantie (licht / geluid / huid)' },
        { id: 'oorsuizen', text: 'Oorsuizen' },
        { id: 'wazigzien', text: 'Wazig Zien' },
        { id: 'drogeogen', text: 'Droge Ogen / Mond' },
        { id: 'spierpijn', text: 'Algehele Spierpijn / Gewrichtspijn' },
        { id: 'slaapkwaliteit', text: 'Slaapkwaliteit' },
        { id: 'slikproblemen', text: 'Slikproblemen' },
        { id: 'heesheid', text: 'Heesheid of Verlies van Stem' },
        { id: 'hartkloppingen', text: 'Onregelmatige Hartslag of Hartkloppingen' },
        { id: 'spijsvertering', text: 'Spijsverteringsproblemen (zoals misselijkheid, opgeblazen gevoel, constipatie)' },
        { id: 'ademhaling', text: 'Ademhalingsproblemen' },
        { id: 'tachycardie', text: 'Verhoogde Hartslag (tachycardie)' },
        { id: 'gagreflex', text: 'Symmetrie van de Gag Reflex' },
        { id: 'uvulasymmetry', text: 'Symmetrie van de Uvula (bij zeggen "ah")' }
    ];

    const questionContainer = document.getElementById('dynamic-questions');

    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('slider-group');
        questionDiv.innerHTML = `
            <label for="${question.id}">${question.text}:</label>
            <input type="range" id="${question.id}" name="${question.id}" min="0" max="10">
            <span id="${question.id}-value">5</span>
        `;
        questionContainer.appendChild(questionDiv);

        // Event listener voor slider waarde
        const slider = questionDiv.querySelector('input[type="range"]');
        slider.addEventListener('input', () => {
            document.getElementById(`${question.id}-value`).textContent = slider.value;
        });
    });

    // Advies genereren op basis van scores
    function generateRecommendations(scores) {
        const avgScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;
        let advice;

        if (avgScore <= 3) {
            advice = "Je algehele score is laag. Dit suggereert een goede gezondheid en welzijn. Blijf doorgaan met je huidige levensstijl!";
        } else if (avgScore <= 6) {
            advice = "Je algehele score is gemiddeld. Overweeg het toevoegen van ademhalingsoefeningen, ontspanningstechnieken en verbeterde slaapgewoontes.";
        } else {
            advice = "Je algehele score is hoog, wat duidt op mogelijke gezondheidsproblemen. Raadpleeg een specialist voor professioneel advies.";
        }

        return advice;
    }

    // Formulierverwerking en aanbevelingen tonen
    document.getElementById('vagus-checklist').addEventListener('submit', function (e) {
        e.preventDefault();

        // Verzamel scores van alle sliders
        const scores = questions.map(q => parseInt(document.getElementById(q.id).value));
        
        // Genereer en toon advies
        const recommendations = generateRecommendations(scores);
        document.getElementById('recommendations').textContent = recommendations;

        // Toon mailto link
        const mailtoLink = `mailto:info@oerlifestyle.com?subject=Nervus Vagus Checklist Resultaten&body=${encodeURIComponent(recommendations)}`;
        const emailResults = document.getElementById('email-results');
        emailResults.setAttribute('href', mailtoLink);
        emailResults.style.display = 'block';
    });

    // Dark mode functionaliteit
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
