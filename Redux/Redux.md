MIDDLEWARE

Pomiędzy wysłaniem akcji a jej dotarciem do miejsca docelowego można dodać middleware. Middleware możmy stworzyć sami lub skorzystać z oprogramowania zewnętrznego. 

ACTION --> MIDDLEWARE --> REDUCER

WŁASNY MIDDLEWARE

const logger = store => {
    return next => {
        return action => {
            console.log('[MIDLEWARE] dispatching', action)
            const result = next(action)
            console.log('[MIDLEWARE] next state', store.getState())
            return result
        }
    }
}


REDUX DEVTOOLS

Narzędzi służące do podglądu naszej aplikacji. W index.js dodajemy.:

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

Następnie importujemy compose z redux oraz owijamy zmienną composeEnhancers nasz applyMiddleware.

DZIAŁANIE ASYNCHRONICZNE

Funkcja Reducera musi działać synchronicznie. Kod asynchroniczny możemy wykonać za pośrednictwem kreatorów akcji. Kreator akcji jest funkcją, która zwraca działanie lub obiekt JavaScript. 
