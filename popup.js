function afficherpopup() {
    let partiepopup=document.getElementById("partiepopup")
    partiepopup.style.display="block" 
}
 function cacherpopup() {
    let partiepopup=document.getElementById("partiepopup")
    partiepopup.style.display="none"
 }
function actionpopup(){
    let btnpartage=document.getElementById("partager")
    btnpartage.addEventListener("click",()=>{
        afficherpopup()
        let jeu=document.getElementById("nomjeu")
        jeu.style.opacity="0.3"
    })
    let btnquitterpartage=document.getElementById("quitterpartage")
    btnquitterpartage.addEventListener("click",()=>{
        cacherpopup() 
        let jeu=document.getElementById("nomjeu")
        jeu.style.opacity=("1")
    })
}