function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function generertableaux(tab1,tab2) {
    let i=0
    while(tab2.length<10){
        tab1.push(getRandomInt(9))
        tab2.push(getRandomInt(9))
    }
}
function operations(indice) {
    let a=getRandomInt(3)
    if (a===0){
        let operation=`${tab1[indice]}+${tab2[indice]}`
        resultat.push(tab1[indice]+tab2[indice])
        return operation
    }
    if (a===1){
        let operation=`${tab1[indice]}x${tab2[indice]}`
        resultat.push(tab1[indice]*tab2[indice])
        return operation
    }
    if (a===2){
        let operation=`${tab1[indice]}-${tab2[indice]}`
        resultat.push(tab1[indice]-tab2[indice])
        return operation
    }
    console.log(a)
    
}
function afficherscore(nbquestion,bnquestion){
    let score= document.getElementById("score")
    let affichagescore = `${bnquestion} / ${nbquestion}`
    score.textContent= affichagescore
}
function afficheroperation(operation) {
     let operationpropose=document.getElementById("motpropose")
     operationpropose.innerText=operation
}
function affichermail(email,nom,score,seconde,minute) {
    let mailto
    if (minute===0){
    mailto=`mailto:${email}?subject=Partage du score de mon jeu &body=Salut c'est ${nom} et j'ai eu le score de ${score} avec le temps de ${seconde} seconde`
    }
    else{
    mailto=`mailto:${email}?subject=Partage du score de mon jeu &body=Salut c'est ${nom} et j'ai eu le score de ${score} avec le temps de ${minute} minute ${seconde} seconde`
    }
    location.href=mailto
}
function verifnom(nom){
    if (nom.length<2){
        throw new Error(`Le champ nom est invalide`)
    }
}
function verifemail(email) {
    RegExpemail=new RegExp("[a-zA-Z0-9.-_']+@[a-zA-Z0-9.-_']+\.[a-zA-Z0-9.-_']")
    if (!RegExpemail.test(email)){
         throw new Error(`Le champ email est invalide`)
    }
}
function affichermessageerreur(message){ 

    let zonemessageerreur=document.getElementById("messageerreur")
    zonemessageerreur.style.display="inline-block"
    zonemessageerreur.innerText=message
}
function gererformulaire(score,seconde,minute) {
     try {
    let nom=document.getElementById("nom").value
    let email=document.getElementById("email").value
    let zonemessageerreur=document.getElementById("messageerreur")
     verifnom(nom)
     verifemail(email)
     zonemessageerreur.style.display="none"
     affichermail(email,nom,score,seconde,minute)
    } catch (erreur) {  
        affichermessageerreur(erreur.message)
    }
}
function timer() {
    let chrono=document.getElementById("chrono")
    let seconde,minute
    seconde=0
    minute=0
    let btnrecommence=document.getElementById("recommence")
    btnrecommence.addEventListener("click",()=>{
        seconde=0
        minute=0
    })
    document.getElementById("recommence2").addEventListener("click",() => {
         seconde=0
        minute=0
    })
    let operationpropose=document.getElementById("motpropose")
        setInterval(()=>{
            if (operationpropose.innerText!=="Le jeu est fini !"){
                seconde++
                temps=`${minute}:${seconde}`
                if(seconde===60){
                    seconde=0
                    minute++
                }
                if(seconde<10){
                    temps=`${minute}:0${seconde}`
                }
                chrono.innerText=temps
            }
            else{
                if(minute===0){
                temps=`Vous avez fini en ${seconde} secondes`
                chrono.innerText=temps
                chrono.value=seconde
                chrono.name=minute
                }
                else{
                    temps=`Vous avez fini en ${minute} minute ${seconde} secondes` 
                    chrono.innerText=temps
                    chrono.value=seconde
                    chrono.name=minute
                }
                
            }
        },1000)
}
function lancerjeu(){ 
    let btnreco =document.getElementById("recommence2")
    let point=0
    i=0
    timer()
    let buttonvalide=document.getElementById("valide")
    let btnrecommence=document.getElementById("recommence")
    let reponse=document.getElementById("reponse")
    reponse.focus()
    afficheroperation(operations(i))
    afficherscore(i, point)
    document.addEventListener("keyup", (event) => {
        if (event.key.startsWith("Enter")) {
             console.log(resultat[i])
        console.log(reponse.value)
            if(reponse.value==resultat[i]){
                point++
            } 
            i++
            afficherscore(i,point)
            reponse.value=""
            reponse.focus()
            if (tab1[i] === undefined) {
                reponse.style.display = "none"
                btnreco.style.display="none"
                afficheroperation("Le jeu est fini !")  
                buttonvalide.style.display="none"
                btnrecommence.style.display="inline-block"
                let btnpartage=document.getElementById("partager")
                btnpartage.style.display="inline-block"
                score=`${point} sur ${i}`
                actionpopup()
                let form=document.querySelector("form")
                form.addEventListener("submit",(event)=>{
                    event.preventDefault()
                    let score=`${point}/${i}`
                    let temps=document.getElementById("chrono")
                    let seconde=temps.value
                    let minute=temps.name
                    console.log(seconde,minute)
                    gererformulaire(score,seconde,minute)
                })
            }  
            else{
                afficheroperation(operations(i))
            } 
        }
    })
    buttonvalide.addEventListener("click", () => {
        console.log(resultat[i])
        console.log(reponse.value)
        if(reponse.value==resultat[i]){
            point++
        } 
        i++
        afficherscore(i,point)
        reponse.value=""
        reponse.focus()
        if (tab1[i] === undefined) {
            reponse.style.display = "none"
            afficheroperation("Le jeu est fini !")  
            buttonvalide.style.display = "none"
            btnreco.style.display="none"
            btnrecommence.style.display="inline-block"
            let btnpartage=document.getElementById("partager")
            btnpartage.style.display="inline-block"
            score=`${point} sur ${i}`
            actionpopup()
            let form=document.querySelector("form")
            form.addEventListener("submit",(event)=>{
                event.preventDefault()
                let score=`${point}/${i}`
                let temps=document.getElementById("chrono")
                let seconde=temps.value
                let minute=temps.name
                console.log(seconde,minute)
                gererformulaire(score,seconde,minute)
            })
        }  
        else{
            afficheroperation(operations(i))
        } 
    })
    btnrecommence.addEventListener("click", () => {
         tab1 = []
        tab2=[]
        resultat = []
        generertableaux(tab1, tab2)
        i=0
        let btnpartage = document.getElementById("partager")
        reponse.style.display = "inline-block"
        btnreco.style.display="inline"
        reponse.focus()
        btnpartage.style.display="none"
        btnrecommence.style.display="none"
        afficheroperation(operations(i))
        point=0 
        buttonvalide.style.display="inline-block"
        afficherscore(i,point)
    })
    document.getElementById("recommence2").addEventListener("click", () => {
        tab1 = []
        tab2=[]
        resultat = []
        generertableaux(tab1, tab2)
        i = 0 
        let btnpartage = document.getElementById("partager")
        reponse.style.display = "inline-block"
        reponse.focus()
        btnpartage.style.display="none"
        btnrecommence.style.display="none"
        afficheroperation(operations(i))
        point=0 
        buttonvalide.style.display="inline-block"
        afficherscore(i,point)
    })
}
let tab1=[]     
let tab2=[]
let resultat = []
let btncommence = document.getElementById("Commencer")
btncommence.addEventListener("click", () => {
    generertableaux(tab1, tab2)
    lancerjeu()
    let presentation=document.getElementById("presentation")
    presentation.style.display="none"
})
