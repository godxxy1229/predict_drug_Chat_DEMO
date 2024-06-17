let urlParams = new URLSearchParams(location.search);

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const scores = extractScoresFromURL(urlParams);

    displayRadarChart(scores);
    displayAdditionalScores(scores.BIS, scores.IMP);
    setupDrugRiskTestButton(urlParams);
});

function extractScoresFromURL(urlParams) {
    return {
        E: urlParams.get('E'),
        A: urlParams.get('A'),
        C: urlParams.get('C'),
        N: urlParams.get('N'),
        O: urlParams.get('O'),
        BIS: urlParams.get('BIS'),
        IMP: urlParams.get('IMP'),
        Age: urlParams.get('age'),
        Education: urlParams.get('education'),
        Country: urlParams.get('country')
    };
}

function displayRadarChart(scores) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['외향성 E', '우호성 A', '성실성 C', '신경성 N', '개방성 O'],
            datasets: [{
                label: 'Personality Scores',
                data: [scores.E, scores.A, scores.C, scores.N, scores.O],
                // Chart.js styling options...
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0, // 최소값을 0으로 설정
                    suggestedMax: 40, // 최대값을 40으로 설정
                    // 추가적인 스타일링 옵션 (필요시)
                }
            }
        }
    });
}

function displayAdditionalScores(bis, imp) {
    document.getElementById('bisScore').innerText += bis;
    document.getElementById('impScore').innerText += imp;
}

function setupDrugRiskTestButton(urlParams) {
    document.getElementById('drugRiskTestButton').addEventListener('click', function() {
        // 현재 URL에서 쿼리 문자열을 추출
        const currentUrl = window.location.href;
        const queryParams = currentUrl.split('?')[1];
    
        // 랜덤 risk 값 생성 (0.2에서 0.5 사이)
        const risk = (Math.random() * (0.5 - 0.2) + 0.2).toFixed(3);
        
        // 약물 리스트
        const drugs = ["Amphet", "Amyl", "Benzos", "Cannabis", "Coke", "Crack", "Ecstasy", "Heroin", "Ketamine", "Legalh", "LSD", "Meth", "Nicotine", "VSA"];
        
        // 약물 리스트에서 중복 없는 랜덤 약물 선택
        const shuffledDrugs = drugs.sort(() => 0.5 - Math.random());
        const drug1 = shuffledDrugs[0];
        const drug2 = shuffledDrugs[1];
        const drug3 = shuffledDrugs[2];
        
        // 새 페이지로 이동하는 URL 생성
        const newBaseUrl = "final_page.html";
        const newUrl = `${newBaseUrl}?${queryParams}&risk=${risk}&drug1=${drug1}&drug2=${drug2}&drug3=${drug3}`;
    
        // 새 페이지로 이동
        window.location.href = newUrl;
    })
};

function scaleScore(score) {
    return Math.round((60 / 40) * score);
}
