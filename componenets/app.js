Vue.component('card', {
    props: ['title','content'],
    data() {
        return {
            claps: 0
        }
    },
    template: `<div class="card">
                    <div class="card-body">
                        <h3 class="card-title">
                            {{ title }}
                        </h3>
                        <div class="card-text">
                            {{ content }}
                        </div>
                        <div class="text-center text-muted display-4">{{ claps }}</div>
                         <button @click="clapForArticle" class="btn btn-info btn-sm">Clap for Me</button>
                        <button @click="deleteArticle" class="btn btn-danger btn-sm">Delete Me</button>
                    </div>
                </div>`,
    methods: {
        deleteArticle() {
            this.$emit('delete-article', this.title)
        },
          clapForArticle() {
            this.claps++
        }
    }
})
new Vue({
    el: '#app',
    data: {
        articles: [{
            title: 'Vuejs for beginners',
            content: "(Just down the street from Marty, a taxi appears. Biff gets out and walks to the driver’s window. The driver gets out a gadget which has been adding his fare.) (v.o) One Seven Four Point Five Zero. That'll be 174.50. Here. (He puts his thumbprint on the taxi driver's gadget). Careful old timer, this is a rough neighborhood."
        }, {
            title: 'Back to the Future' ,
            content: "(Tannen and the Marshall glare at each other.) Have fun. (to his son) That's how you handle them, son, never give them an inch. Maintain discipline at all times. Remember that word...discipline. Solemnly. I will, Pa. (The Festival)"
        }]
    },
    methods: {
        removeArticle(event) {
            this.articles = this.articles.filter(article => article.title !== event)
        }
    }
})