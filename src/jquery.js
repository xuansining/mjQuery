//jQuery对象是指jQuery函数构造出来的对象
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements;
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            elements = [createElement(selectorOrArrayOrTemplate)]
        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }

    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate
    }

    function createElement(string) {
        const container = document.createElement('template')
        container.innerHTML = container.trim()
        return container.content.firstChild
    }

    const api = Object.create(jQuery.prototype)
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    return api;



};


jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
    get(index) {
        return this.element[index]
    },
    appendTo(node) {
        if (node instanceof Element) {

            this.each(e1 => node.appendChild(e1))

        } else if (jquery === true) {
            this.each(e1 => node.get(0).appendChild(e1))
        }

    },

    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children)
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i])
            }
        } else if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node))
        }
    },
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this
    },
    find(selector) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
            console.log(elements2);
            array = array.concat(elements2)

        }

        array.oldApi = this
        return jQuery(array)
    },
    //回到上一个Api
    end() {
        return this.oldApi
    },
    //遍历
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    parent() {
        let arr = []
        this.each((element) => {
            if (arr.indexOf(element.parentNode) === -1) {
                arr.push(element.parentNode)
            }
        })

        return jQuery(arr)
    },
    print() {
        console.log(this.elements)
    },
    children() {
        let arr = []
        this.each((element) => {
            //等价于 arr.push(element.children[0],element.children[1]...)
            arr.push(...element.children)
        })
        return jQuery(arr)
    }
}