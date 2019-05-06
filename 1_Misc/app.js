new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: 0,
        from: 'USD',
        to: 'EUR',
        result: 0,
        loading: false
    },
    mounted() {
      this.getCurrencies();
                
    },
    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies);
        },
        calculateResult() {
            return (Number(this.amount) * this.result).toFixed(2);
        },
        disabled() {
            return this.amount === 0 || !this.amount || this.loading;
        }
    },
    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies')
            if(currencies) {
                this.currencies = JSON.parse(currencies);
                return;
            }
            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=62e94101b5895c258ced')
                .then(response => {
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results))
                });
        },
        convertCurrency() {
        const key =  `${this.from}_${this.to}`;
            this.loading = true;
        axios.get('https://free.currconv.com/api/v7/convert?apiKey=62e94101b5895c258ced&q=' + key + '&compact=ultra')
            .then((response) => {
                this.loading = false;
            console.log(response.data);
            console.log(key);
                this.result = response.data.results[key].val
            })
        }
    },
    watch: {
        from() {
            this.result = 0;
        },
        to() {
            this.result = 0;
        }
    }
})