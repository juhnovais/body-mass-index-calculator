document.addEventListener('DOMContentLoaded', function () {
    // Get both radio buttons
    let metricRadio = document.getElementById('metric');
    let imperialRadio = document.getElementById('imperial');
    let height = document.getElementById('height');
    let weight = document.getElementById('weight');

    // Get the container for the Imperial input fields
    let metricContainer = document.querySelector('.formetric');
    let imperialContainer = document.querySelector('.forimperial');
    let resultTextInitial = document.querySelector('.resultTextInitial');
    let resultText = document.querySelector('.resultText');
    let classification = document.querySelector('.classification');
    let range = document.querySelector('.range');
    let bmiResultStart = document.querySelector('.bmiResultStart');
    let lowerWeight;
    let upperWeight;

    const heightft = document.getElementById('heightft');
    const heightin = document.getElementById('heightin');
    const weightst = document.getElementById('weightst');
    const weightlbs = document.getElementById('weightlbs');

    let bmiResult = document.querySelector('.resultTotal');

    // Attach a change event listener to each radio button
    metricRadio.addEventListener('change', toggleInputs);
    imperialRadio.addEventListener('change', toggleInputs);

    const elements = ['height', 'weight', 'heightft', 'heightin', 'weightst', 'weightlbs'];

    elements.forEach(element => {
        const el = document.getElementById(element);
        el.addEventListener("change", toggleInputs);
        el.addEventListener("keyup", toggleInputs);
    });
    

    // Function to toggle the visibility of input fields based on the selected radio button
    function toggleInputs() {
        if (metricRadio.checked) {

            clearInput(height, weight, heightft, heightin, weightst, weightlbs);

            metricContainer.style.display = 'inherit';
            imperialContainer.style.display = 'none';

            // store height and weight values in letiables
            let heightVal = height.value / 100;
            let weightValue = weight.value;



            if (heightVal > 0 && weightValue > 0) {

                bmiCalc(weightValue, heightVal, 0, 0);


            } else {
                bmiResult.innerText = 0;
            }



        } else if (imperialRadio.checked) {

            clearInput(height, weight, heightft, heightin, weightst, weightlbs);
            clearImperialInput(heightft, heightin, weightst, weightlbs)

            metricContainer.style.setProperty('display', 'none', 'important');
            imperialContainer.style.setProperty('display', 'inherit', 'important');

            let heightftVal = heightft.value;
            let heightinVal = heightin.value;

            let weightstVal = weightst.value;
            let weightlbsVal = weightlbs.value;

            let heightftMetre = heightftVal * 0.3048;
            let heightinMetre = heightinVal * 0.0254;

            let weightstKg = weightstVal * 6.35029;
            let weightlbsKg = weightlbsVal * 0.453592;

            if (heightftVal > 0 && weightstVal > 0) {

                bmiCalc(weightstKg, heightftMetre, weightstVal, weightlbsVal);

            } else if (heightftVal > 0 && weightlbsVal > 0) {

                bmiCalc(weightlbsKg, heightftMetre, weightstVal, weightlbsVal);

            } else if (heightinVal > 0 && weightstVal > 0) {

                bmiCalc(weightstKg, heightinMetre, weightstVal, weightlbsVal);

            } else {
                if (heightinVal > 0 && weightlbsVal > 0) {

                    bmiCalc(weightlbsKg, heightinMetre, weightstVal, weightlbsVal);
                }
            }

        }
    }

    function clearInput(cm, kg, feet, inc, st, lbs) {

        if (metricRadio.checked) {
            feet.value = '';
            inc.value = '';
            st.value = '';
            lbs.value = '';
        } else if (imperialRadio.checked) {
            kg.value = '';
            cm.value = '';
        }


        document.querySelector('.h2Score').innerText = 'Welcome!';
        bmiResult.style.display = 'none';
        resultTextInitial.style.display = 'inherit';
        resultText.style.display = 'none';
        bmiResultStart.style.setProperty('flex-direction', 'column');
    }

    function clearImperialInput(feet, inc, st, lbs) {
        feet.addEventListener('keyup', function () {
            inc.value = '';
        });
    
        inc.addEventListener('keyup', function () {
            feet.value = '';
        });
    
        st.addEventListener('keyup', function () {
            lbs.value = '';
        });
    
        lbs.addEventListener('keyup', function () {
            st.value = '';
        });
    }
    

    function bmiCalc(w, h, s, lbs) {
        bmi = w / (h * h);
        document.querySelector('.h2Score').innerText = 'Your BMI is...';

        bmiResult.innerText = bmi.toFixed(1);
        bmiResult.style.display = 'inherit';
        resultTextInitial.style.display = 'none';
        resultText.style.display = 'block';
        bmiResultStart.style.setProperty('flex-direction', 'row');

        if (bmi < 18.5) {
            classification.innerText = 'Underweight';

        } else if (bmi >= 18.5 && bmi < 24.9) {
            classification.innerText = 'Healthy weight';


        } else if (bmi > 25 && bmi < 29.9) {
            classification.innerText = 'Overweight';

        } else {
            classification.innerText = 'Obese';
        }

        lowerWeight = 18.5 * h ** 2;
        upperWeight = 24.9 * h ** 2;

        if (metricRadio.checked) {
            range.innerText = ' between ' + lowerWeight.toFixed(1) + 'kgs - ' + upperWeight.toFixed(1) + 'kgs';
        } else {
            if (s > 0) {
                lowerWeight *= 0.157473;
                upperWeight *= 0.157473;
                range.innerText = ' between ' + lowerWeight.toFixed(1) + ' stones - ' + upperWeight.toFixed(1) + ' stones';
            } else {
                lowerWeight *= 2.20462;
                upperWeight *= 2.20462;
                range.innerText = ' between ' + lowerWeight.toFixed(1) + ' pounds - ' + upperWeight.toFixed(1) + ' pounds';

            }

        }

    }


    function cmToFeetAndInches(cm) {

        // Convert centimeters to feet
        const feet = cm / 30.48;

        // Convert decimal part to inches
        const inches = cm * 0.393701;

        heightft.value = feet.toFixed(2);
        heightin.value = inches.toFixed(2);

        return {
            feet: feet.toFixed(2),
            inches: inches.toFixed(2)
        };

    }

    function kgToStAndLbs(kg) {
        // Convert kilograms to stones
        const stones = kg / 6.35029;

        // Calculate the remaining pounds
        const pounds = kg * 2.20462;

        weightst.value = stones.toFixed(2);
        weightlbs.value = pounds.toFixed(2);

        return {
            stones: stones,
            pounds: pounds
        };
    }




});