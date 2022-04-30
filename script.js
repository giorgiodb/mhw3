/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const checkbox = './images/checked.png'
const uncheckbox = './images/unchecked.png'

const button = document.querySelector('#risultato');
button.classList.add('hidden');

let map = [];

function changebox(event){
    const box = event.currentTarget;
    const section = box.parentElement;
    const array = section.querySelectorAll('div');
    for (const x of array) {
        if (x === box) {
            x.classList.add("selected");
            x.classList.remove("unselected");
            const img = x.querySelector('.checkbox');
            img.src = checkbox;
        }else {
            x.classList.remove("selected");
            x.classList.add("unselected");
            const img1 = x.querySelector('.checkbox');
            img1.src = uncheckbox;
        }
    }

    const selezionato = document.querySelectorAll('.selected');
    if(selezionato.length == 3){
        
        for (const a of div) {
            a.removeEventListener('click', changebox);
        }

        for (const b of selezionato) {
            map.push(b.dataset.choiceId);
        }
        console.log(map)

        const res = document.querySelector('#risultato');
        res.classList.remove('hidden');
        if(map[0] === map[1] || map[0] === map[2]){
            const h1 = res.querySelector('h1');
            h1.textContent = RESULTS_MAP[map[0]].title;
            const p = res.querySelector('p');
            p.textContent = RESULTS_MAP[map[0]].contents;
        }else if(map[1] === map[2]){
            const h1 = res.querySelector('h1');
            h1.textContent = RESULTS_MAP[map[1]].title;
            const p = res.querySelector('p');
            p.textContent = RESULTS_MAP[map[1]].contents;
        }else{
            const h1 = res.querySelector('h1');
            h1.textContent = RESULTS_MAP[map[0]].title;
            const p = res.querySelector('p');
            p.textContent = RESULTS_MAP[map[0]].contents;
        }
    }
}

function restart(){
    scrollTo(0,0);
    const sel = document.querySelectorAll(".selected");
    for(const c of sel){
        c.classList.remove("selected");
        const img = c.querySelector('.checkbox')
        img.src = uncheckbox;
    }
    
    const unsel = document.querySelectorAll(".unselected");
    for(const d of unsel){
        d.classList.remove("unselected");
    }
    
    button.classList.add("hidden");
    
    for (const e of div) {
        e.addEventListener('click', changebox)
    }

    map = []
}

const div = document.querySelectorAll('.choice-grid div');
for (const select of div) {
    select.addEventListener('click', changebox)
}

const reset = document.querySelector('button');
reset.addEventListener('click', restart)
