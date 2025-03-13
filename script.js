document.addEventListener('DOMContentLoaded', function () {
    const topHeader = document.querySelector('header')
    let headerTopscroll = false
    console.log('It work!')
    // console.log('topHeader',topHeader)
    document.addEventListener('scroll', function (e) {
        if (window.scrollY > 0 && !headerTopscroll) {
            console.log('topHeader',topHeader)
            // topHeader.style.opacity = '0.5'
            topHeader.style.backgroundColor = 'rgb(0,0,0,0.8)'
            headerTopscroll = true
        }
        if (window.scrollY == 0 && !!headerTopscroll) {
            topHeader.style.backgroundColor = 'unset'
            headerTopscroll = false
        }
    })

    class scrollToForm {
        static initBtnsAndForm() {
            this.btns = document.querySelectorAll('.order-btn')
            this.headerTop = document.querySelector('.header')
            this.submitFormWrapper = document.querySelector('.submit-form')
        }
        static registerEvents() {
            this.btns.forEach((bt)=>{
                bt.addEventListener('click', (e)=>{
                    let headOffset = parseInt(window.getComputedStyle(this.headerTop).height)
                    let formPosition = parseInt(this.submitFormWrapper.getBoundingClientRect().top)
                    let scrollValue = formPosition + window.scrollY - headOffset
                    window.scrollTo({
                        top: scrollValue,
                        behavior: "smooth"
                    });
                })
            })
        }
        static init() {
            this.initBtnsAndForm()
            this.registerEvents()
        }
    }
    scrollToForm.init()

    class submitForm {
        static initSubmitForm() {
            this.sumbitForm = document.querySelector('#submit-form')
            this.outputMsg = this.sumbitForm.querySelector('#output-mess')
            console.log('this.outputMsg',this.outputMsg)
        }
        static registerEvent() {
            this.sumbitForm.addEventListener('submit', async (e)=>{
                e.preventDefault()
                const dataForm = new FormData(this.sumbitForm)
                console.log('dataForm!', dataForm)
                // console.log('dataForm!', dataForm.get('email'))
                await fetch('/msg.php',{
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'application/json;charset=utf-8'
                    // },
                    // body: dataForm
                    body: dataForm
                }).then(response => {
                    let rsp = response.json()
                    // console.log(rsp)
                    rsp.then(data=>{
                        console.log(data.txt)
                        this.outputMsg.innerHTML = data.txt
                        this.outputMsg.style.marginBottom = '28px'
                        if (!data.success) {
                            this.outputMsg.style.color = '#FF0000'
                        } else {
                            this.outputMsg.style.removeProperty('color')
                        }
                    }).catch(error=>{
                        console.error('Отклонено с сообщением', error)
                        this.outputMsg.innerHTML = 'Проверьте настройки почтового сервиса'
                        this.outputMsg.style.marginBottom = '10px'
                        this.outputMsg.style.color = '#FF0000'
                    })
                })
                this.sumbitForm.reset()
            })
        }
        static init() {
            this.initSubmitForm()
            this.registerEvent()
        }
    }
    submitForm.init()

    class checkValidateFildsForm {
        constructor() {
            this.registerDomObjects()
            this.registerEvents()
        }
        registerDomObjects () {
            this.formfields = {
                name: document.querySelector('#submit-form #name'),
                email: document.querySelector('#submit-form #email'),
                accept: document.querySelector('#submit-form #accept')
            }

        }
        registerEvents () {
            console.log(this.formfields)

            for (let item in this.formfields) {
                this.formfields[item].addEventListener('blur', (e)=>{
                    this.formfields[item].reportValidity();
                    if (this.formfields[item].validity.valid) {
                        this.outputLog('');
                    } else if (this.formfields[item].validity.valueMissing) {
                        this.outputLog(`field ${item} cannot be empty.`);
                    } else {
                        this.outputLog("Bad input detected: " + this.formfields[item].validationMessage);
                    }
                })
            }
        }
        outputLog (text) {
            this.outputMsg = document.querySelector('#submit-form #output-mess')
            this.outputMsg.innerHTML = text
            this.outputMsg.style.marginBottom = '10px'
            this.outputMsg.style.color = '#FF0000'
        }
    }

    let orderForm = new checkValidateFildsForm()

    class burgerMenu {
        static init() {
            this.registerDomObjects()
            this.registerEvents()
            console.log(this.headOffset)
        }
        static registerDomObjects () {
            this.burger = document.querySelector('#burger')
            this.burgerNav = document.querySelector('.header-nav')
            this.headerTop = document.querySelector('.header')
            this.headOffset = parseInt(window.getComputedStyle(this.headerTop).height)
        }
        static registerEvents () {
            this.burger.addEventListener('click', () => {
                this.burger.classList.toggle('active');
                this.burgerNav.classList.toggle('active');
                this.burgerNav.style.top = this.headOffset + 'px'
            });
        }
    }
    burgerMenu.init()
    // const burger = document.querySelector('#burger');
    //
    // burger.addEventListener('click', () => {
    //     burger.classList.toggle('active');
    // });
})