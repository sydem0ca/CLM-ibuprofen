const rootSelector = '[data-js-slides]'

const competitors = await fetch('./competitors.json')
const competitorsJSON = await competitors.text();
const competitorsData = JSON.parse(competitorsJSON)

const dynamic = await fetch('./dynamic.json')
const dynamicJSON = await dynamic.text();
const dynamicData = JSON.parse(dynamicJSON)

const collorsCollection = [
    '#FF1',
    '#F1F',
    '#1FF',
    '#F11',
    '#1F1',
    '#11F',
]

const titles = [
    'Ибупрофен',
    'Формы выпуска препарата',
    'Соотношение долей брендов конкурентной группы',
    'Почему выбирают ибупрофен от oldPharm',
    'Динамика продаж препарата',
    'Механизм действия ибупрофена',
]

const formImages = [
    '/sources/archive/adult-2.png',
    '/sources/archive/adult-1.png',
    '/sources/archive/kids-1.png',
    '/sources/archive/kids-2.png',
    '/sources/archive/local-1.png',
]

const formSubtitles = [
    'Стандартное решение для взрослых',
    'Быстрое высвобождение',
    'Для детей',
    'Если нельзя принимать внутрь',
    'Локальное применение',

]

const advantagesList = [
    'Облегчение боли уже в первые часы после приёма',
    'Подходит при: боли, температуре',
    'Широко используется в клинической практике',
    'Таблетки, суспензия, гель и др. - под разные ситуации'
]

const advantagesTitles = [
    'Быстрое действие',
    'Универсальность',
    'Проверенная эффективность',
    'Разнообразие форм выпуска',
]

class Data {
    constructor(prevSlideIndex, newSlideIndex){
        this.slide = titles[prevSlideIndex]
        this.choice = titles[newSlideIndex]
        this.timestamp = new Date().getTime()
        this.userActions = [...MouseCollection]
        MouseCollection.length = 0
    }
}

const DataCollection = []

const MouseCollection = []

class Slide {
    selectors = {
        root : rootSelector,
        button : '[data-js-slides-button]',
        content : '[data-js-slides-content]',
        skipButton : '[data-js-skip-button]',
        headerMenu : '[data-js-header-menu]',
        title : '[data-js-slides-title]',
        formsButton : '[data-js-forms-button]',
        formsimg : '[data-js-forms-img]',
        formslabel : '[data-js-forms-label]',
        competitorsChart : '[data-js-competitors-chart]',
        advantagesCard : '[data-js-advantaages-card]',
        dynamicChart : '[data-js-dynamic-chart]',
    }

    stateClasses = {
        isActive : 'is-active',
        visuallyHidden : 'visually-hidden'
    }

    stateAttributes = {
        ariaSelected : 'aria-selected',
        slideIndex : 'slideindex'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
        this.skipButtonElement = this.rootElement.querySelectorAll(this.selectors.skipButton)
        this.headerMenuElement = this.rootElement.querySelectorAll(this.selectors.headerMenu)
        this.titleElement = this.rootElement.querySelector(this.selectors.title)
        this.formsButtonElements = this.rootElement.querySelectorAll(this.selectors.formsButton)
        this.formsimgElement = this.rootElement.querySelector(this.selectors.formsimg)
        this.formslabelElement = this.rootElement.querySelector(this.selectors.formslabel)
        this.competitorsChartElement = this.rootElement.querySelector(this.selectors.competitorsChart)
        this.ctxCompetitors = this.competitorsChartElement.getContext('2d')
        this.advantagesCardElements = this.rootElement.querySelectorAll(this.selectors.advantagesCard)
        this.dynamicChartElement = this.rootElement.querySelector(this.selectors.dynamicChart)
        this.ctxDynamic = this.dynamicChartElement.getContext('2d')
        this.state = {
            activeSlideIndex: [...this.buttonElements]
                .forEach((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))
        }
        this.limitSlideIndex = this.buttonElements.length - 1
        this.getDynamicChart()
        this.getAdvantagesCard()
        this.getCompetitorsChart()
        this.bindEvents()
    }

    updateUI(){
        const {activeSlideIndex} = this.state

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeSlideIndex
            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeSlideIndex
            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
        })

        this.headerMenuElement.forEach((element) => {
            const visuallyHidden = activeSlideIndex === 0
            element.classList.toggle(this.stateClasses.visuallyHidden, visuallyHidden)
        })

        this.skipButtonElement.forEach((element) => {
            const visuallyHidden = activeSlideIndex !== 4
            element.classList.toggle(this.stateClasses.visuallyHidden, visuallyHidden)
        })

        this.titleElement.textContent = titles[activeSlideIndex]
    }

    FakeSendData(url, data, successProbability = 0.8){
        console.log(`try send to ${url}`, data)
        const randomValue = Math.random()
        this.updateUI()
        if (randomValue <= successProbability){
            console.log(dataCollection)

            console.log('send data')
            return true
        }else{
            console.warn('data not send')
            return false
        }
    }

    DataUpdate(prevSlideIndex, buttonIndex){
        DataCollection.push(new Data(prevSlideIndex, buttonIndex))

        this.FakeSendData('server', DataCollection, 1)
    }

    onButtonClick(buttonIndex){
        const prevSlideIndex = this.state.activeSlideIndex
        this.state.activeSlideIndex = buttonIndex

        this.DataUpdate(prevSlideIndex, buttonIndex)

        
    }

    getMousePosition(event){
        MouseCollection.push(`X=${event.clientX}, Y=${event.clientY}`)
    }

    onButtonHoverOn(buttonIndex){
        this.formsimgElement.src = formImages[buttonIndex]
        this.formslabelElement.textContent = formSubtitles[buttonIndex]
    }

    onButtonHoverOff(buttonIndex){
        this.formsimgElement.src = ''
        this.formslabelElement.textContent = ''
    }

    onCardHoverOn(cardIndex){
        this.advantagesCardElements[cardIndex].textContent = advantagesList[cardIndex]
        this.advantagesCardElements[cardIndex].classList.add('rotate')
    }

    onCardHoverOff(cardIndex){
        this.advantagesCardElements[cardIndex].textContent = advantagesTitles[cardIndex]
        this.advantagesCardElements[cardIndex].classList.remove('rotate')
    }
    
    bindEvents() {
        this.buttonElements.forEach((button, index) => {
            button.addEventListener('click', () => this.onButtonClick(index))
        })

        this.skipButtonElement.forEach((button) => {
            button.addEventListener('click', () => this.onButtonClick(2))
        })

        this.formsButtonElements.forEach((button, index) => {
            button.addEventListener('mouseover', () => this.onButtonHoverOn(index))
        })

        this.formsButtonElements.forEach((button, index) => {
            button.addEventListener('mouseout', () => this.onButtonHoverOff(index))
        })

        this.advantagesCardElements.forEach((element, index) => {
            element.addEventListener('mouseover', () => this.onCardHoverOn(index))
        })

        this.advantagesCardElements.forEach((element, index) => {
            element.addEventListener('mouseout', () => this.onCardHoverOff(index))
        })

        this.rootElement.addEventListener('mousemove', () => this.getMousePosition(event))
    }

    getCompetitorsChart() {
        let lastvalue = 0
        let temp = 0
        for (const key in competitorsData){
            
            const value = (Number(competitorsData[key])/100)*2*Math.PI

            this.ctxCompetitors.beginPath()
            this.ctxCompetitors.moveTo(300, 400)
            this.ctxCompetitors.arc(300, 400, 250, lastvalue, lastvalue + value, false)
            this.ctxCompetitors.closePath()

            this.ctxCompetitors.fillStyle = collorsCollection[temp]
            this.ctxCompetitors.fill()
            this.ctxCompetitors.stroke()
            lastvalue += value
            temp++

        }

        temp = 0
        lastvalue = 0

        lastvalue = 0

        for (const key in competitorsData){
            this.ctxCompetitors.beginPath()
            this.ctxCompetitors.rect(600, 200 + lastvalue, 30, 30)
            this.ctxCompetitors.closePath()


            this.ctxCompetitors.fillStyle = collorsCollection[temp]
            this.ctxCompetitors.fill()
            this.ctxCompetitors.stroke()

            this.ctxCompetitors.font = "36px Arial"
            this.ctxCompetitors.fillStyle = '#000'
            this.ctxCompetitors.fillText(`${competitorsData[key]}% - ${key}`, 650, 230 + lastvalue)

            temp++
            lastvalue += 60
        }
    }

    getAdvantagesCard(){
        this.advantagesCardElements.forEach((element, index) => {
            element.textContent = advantagesTitles[index]
        })
    }

    getDynamicChart(){
        this.ctxDynamic.beginPath()
        this.ctxDynamic.moveTo(50, 50)
        this.ctxDynamic.lineTo(50, 750)
        this.ctxDynamic.lineTo(950, 750)
        this.ctxDynamic.lineWidth = 5
        this.ctxDynamic.stroke()

        const chartLenght = Object.keys(dynamicData).length
        const chartStepX = 800/chartLenght
        let chartMaxY = 0
        let temp = 1

        for (const key in dynamicData){
            if (Math.ceil(Number(dynamicData[key])) > chartMaxY){
                chartMaxY = Math.ceil(Number(dynamicData[key]))
            }

            this.ctxDynamic.beginPath()
            this.ctxDynamic.moveTo(50 + (chartStepX * temp), 740)
            this.ctxDynamic.lineTo(50 + (chartStepX * temp), 760)
            this.ctxDynamic.lineWidth = 3
            this.ctxDynamic.stroke()

            this.ctxDynamic.font = "36px Arial"
            this.ctxDynamic.fillText(`${key}`, 10 + (chartStepX * temp), 795)

            temp++
        }

        const chartStepY = (750 - 200) / chartMaxY

        for (let i = 1; i <= 4; i++){
            this.ctxDynamic.beginPath()
            this.ctxDynamic.moveTo(40, 750 - (chartStepY * (i * 4)))
            this.ctxDynamic.lineTo(60, 750 - (chartStepY * (i * 4)))
            this.ctxDynamic.lineWidth = 3
            this.ctxDynamic.stroke()

            this.ctxDynamic.font = "36px Arial"
            this.ctxDynamic.fillText(`${i * 4}`, 0, 760 - (chartStepY * (i * 4)))
        }

        temp = 1
        let lastKey = 0

        this.ctxDynamic.beginPath()
        for (const key in dynamicData){

            if (temp === 1){
                this.ctxDynamic.moveTo(30 + (chartStepX * temp), (750 - (chartStepY * (Number(dynamicData[key])))))
            }else{
                this.ctxDynamic.lineTo(30 + (chartStepX * temp), (750 - (chartStepY * (Number(dynamicData[key])))))
            }

            if (temp === chartLenght){
                lastKey = key
            }
            
            

            temp++
        }
        this.ctxDynamic.strokeStyle = "aqua"
        this.ctxDynamic.lineWidth = 5
        this.ctxDynamic.stroke()

        this.ctxDynamic.beginPath()
        this.ctxDynamic.arc(30 + (chartStepX * (temp-1)), (750 - (chartStepY * (Number(dynamicData[lastKey])))), 20, 0, 2 * Math.PI)
        this.ctxDynamic.strokeStyle = "red"
        this.ctxDynamic.fillStyle = 'red'
        this.ctxDynamic.fill()
        this.ctxDynamic.stroke()
    }
}

class SlideCollection { 
    constructor(){
        this.init()
    }

    init(){
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Slide(element)
        })
    }
}

new SlideCollection()


