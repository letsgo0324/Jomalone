const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", e=>{

    if(!isTxt("userid",5)) e.preventDefault();
    if(!isTxt("comments",10)) e.preventDefault();
    if(!isEmail("email",10)) e.preventDefault();
    if(!isCheck("interest")) e.preventDefault();
    if(!isCheck("gender")) e.preventDefault();
    if(!isSelect("joinRoute")) e.preventDefault();
    if(!isPwd("pwd1","pwd2",7)) e.preventDefault();    
    if(!isAgree("agree")) e.preventDefault();
})

function isTxt(name,len){
    const input = form.querySelector(`[name=${name}]`);
    const txt = input.value.trim();

    if(txt.length > len){
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        return true;
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`!! Please write at least ${len} characters`);
        input.closest("td").append(errMsg);

        return false;
    }
}

function isEmail(name,len){
    const input = form.querySelector(`[name=${name}]`);
    const txt = input.value;

    if(txt.length > len && /@/.test(txt)){
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        return true;
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`!! Please enter your email address including @ at least 10 characters`)
        input.closest("td").append(errMsg);

        return false;
    }
}

function isCheck(name){
    const inputs = form.querySelectorAll(`[name=${name}]`);
    let isChecked = false;

    for(let input of inputs){
        if(input.checked) isChecked = true;
    }

    if(isChecked){
        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

        return true;
    }else{
        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`!! Please check one or more items`);
        inputs[0].closest("td").append(errMsg);

        return false;
    }
}

function isSelect(name){
    const sel = form.querySelector(`[name=${name}]`);
    const sel_index = sel.options.selectedIndex;
    const sel_val = sel.options[sel_index].value;

    if(sel_val !== ""){
        const errMsgs = sel.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove();

        return true;
    }else{
        const errMsgs = sel.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`!! Please check one or more items`);
        sel.closest("td").append(errMsg);

        return false;
    }
}

function isPwd(name1, name2, len){
    const pwd1 = form.querySelector(`[name=${name1}]`);
    const pwd2 = form.querySelector(`[name=${name2}]`);
    const pwd1_val = pwd1.value;
    const pwd2_val = pwd2.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[!@#$%^&*()_+\[\]<>/]/;


    if(pwd1_val === pwd2_val && pwd1_val.length > len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)){
        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();

        return true;
    }else{
        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`Enter a password of ${len} or more characters, including all English letters, numbers, and special characters`);
        pwd1.closest("td").append(errMsg);

        return false;
    }
}

function isAgree(name){
    const input = document.querySelector(`[name=${name}]`);

    if(input.checked){
        const errMsgs = input.closest(".agreement").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest(".agreement").querySelector("p").remove();

        return true;
    }else{
        const errMsgs = input.closest(".agreement").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest(".agreement").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`!! Please have to check`);
        input.closest(".agreement").append(errMsg);

        return false;
    }
}