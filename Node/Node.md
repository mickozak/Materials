Nodejs jest środowiskiem uruchomieniowym JavaScript. Nodejs jest "inną wersją", jest w zasadzie zbudowany na JavaScript ale dodaje do niego pewne funkcje. Nodejs umożliwia posługiwanie się językiem JavaScript nie tylko w przeglądarce ale również na serwerze.

Po stronie klienta używamy html, css oraz js. Użytkownik wysyła zapytania do serwera i otrzymuje odpowiedz, może łąćzyć się z bazą danych. Po stronie serwera również możemy wykonać pewne operacje których ze względu na bezpieczństwo czy też wydajność nie wykonamy po stronie klienta w przeglądarce.

Podejście REPL - Read Eval Print Loop - wykonujemy kod podczas pisania.
Execute Files - wykorzystywane w prawdziwych aplikacjach.

Moduły
1. http - uruchomienie serwera, wysyłanie requests
2. https - umożliwia uruchamianie SSL
3. fs
4. path
5. os

Start Serwera

const http = require('http')

const server = http.createServer((req,res)=>{
    console.log(req)
})

server.listen(3000)

Można zarejestrować funkcje kodu, które działają kiedyś w przyszłości ale nie koniecznie teraz. Kod po kodzie fnkcji która znajduje się wcześniej może zostać wywołany przed ponieważ mamy do czynienia z wywołaniem zwrotnym, które zostanie nazwane kiedyś w przyszłości. Nie chcemy blokować kodu zawsze chcemy być w oczekiwaniu aż nowe zdarzenia zpetlą pętlę zdarzeń, a następnie wykonają kod i nigdy nie będą blokować tej pętli zdarzeń zbyt długo. 

Używanie synchrnizacji plików zapisu oznacza synchroniczniczne i jest to specjalna metoda która faktycznie blokuje wykonywanie kody, dopóki ten plik nie zostanie utworzony. 

Praca z plikami następuje w dwóch trybach. Pierwszy jest synchroniczny i blokuje wykonanie następnego wiersza kodu, dopóki ten plik nie zostanie ukończony. Ma zastsowanie w przypadku małych plików.
fs.writeFileSync('message.txt',message);
Drugim jest tryb asynchroniczny, który oprócz scieżki i danych akceptuje też trzeci argument callback - funkcja która powinna zostać wykonana po jej zakończeniu. 

W Node.js architektura oparta jest na zdarzeniach, w której po prostu mówisz nodejs, proszę, zrób coś a nastepnie przeprowadz ten proces do systemu operacyjnego, który używa wielowątkowości itd. A następnie kontynuj pętlę zdarzeń, aby nasłuchiwać wywołań zdarzeń i zawsze wsyłaj tak małe akcje, aby nigdy nie blokować wykonywania kodu. 

NIGDY NIE NASTEPUJE BLOKOWANIE SYSTREMU/SERWERA!!!

Node.js używa tylko jednego pojedyńczego JavaScript-owego wątku, można go utożsamiać z procesem w naszym systemie operacyjnym. 

"fs" daje dostęp do systemu plików.

Event Loop - uruchamiana jest przez nodejs podczas uruchamiania naszego programu automatycznie. Jest ona odpowiedzialna za obsługę wywołań zwrotnych zdarzeń - za uruchomienie kodu po wystąpieniu określonego zdarzenia. Event Loop obsłuży tylko wywołania zwrotne które zawierają szybko kończący się kod. 
Większe pliki i długie operacje są wysyłane do Worker Pool, która jest zarządzana przez nodejs. Worker Pool oderwana jest od JS i działa na różnych wątkach. Po wykonaniu pracy Worker Pool uruchomi "Trigger Callback" który połączy się z Event Loop. 

Event Loop na początku każdej nowej iteracji sprawwdza czy są jakieś wywołania czasowe, które powinna wykonać. W dalszej kolejności sprawdza inne wywołania zwrotne gdy mamy zapis lub odczyt pliku (wszelkie operacje na plikach, ale też operacje sieciowe,...). Kolejna faza to faza przeciągania w której Node.js szuka nowych zdarzeń IO i zrobi wszystko, aby od razu wykonać ich callback jak również sprawdza wywołania czasowe i jeśli takie się znajdują przeskakuje aby je wykonać. W fazie sprawdzania będą wykonane natychmiastowe wywołania zwrotne. Wywołania natychmiastowe setImmediate() zostanie wykonane natychmiast ale zawsze po wykonaniu otwarych wywołań zwrotnych. W piątej fazie Node.js wywoła wszystkie zamknięte wywołania zwrotne. 
Każde wywołania zwrotne zwiększa refs (process.exit refs==0)

JEŚLI KOD BĘDZIE UMIESZCZONY Z ZDARZENIU NIE ZOSTANIE WYWOŁANY ODRAZU!!!

Debugging

NPM - menedzer pakietów węzłów. Możemu użyć NPM do instalacji paczek dodatkowych lub zainicjować tak zwany projekt węzła.  

NPM INIT() - rozpoczyna proces tworzenia paczki którą możemy wykorzystać w przyszłości.

Paczka Nodemon to pakiet do automatycznego restartowania.

Pakiety można podzielić na pomagające w rozoju naszej aplikacji oraz pakiety pomagajće w działaniu. 

npm install nodemon --save-dev
npm install nodemon --save
npm install nodemon -g
npm install

Typy błędów:
- związane ze składnią,
- błędy środowiska wykonawczego,
- błędy logiczne.

Express.js - framework dla Node.js który przyspiesza tworzenie projektu.

const http = require('http');
const app = express()
const server = http.createServer(app)
server.listen(3000)

Middleware

Request -> Middleware -> Middleware -> Response

Przychodzące żądanie jest automatycznie kierowane przez grupę funkcji przez express.js, więc zmiast tylko jednego programu obsługi żądań faktycznie będziesz mieć możliwość zahaczenia wiele funkcji przez które żądanie będzie przekazywane dopóki nie wyślesz odpowiedzi. Pozwala to na podzielenie kodu na wiele bloków lub elementów zamiast posiadania jednej ogromnej funkcji, która wykonuje wszystko.

"Use" pozwala nam dodać nową funkcję middleware. Można przekazać do jego wnętrza funkcje która zostanie wykonana dla każdego przychodzącego żądania. Funkcja otrzymuje trzy argumenty: żądanie, odpowiedz, next. 

Next jest w rzeczywistości funkcją, funkcja, która zostanie przekazana do tej funkcji przez expressjs i może być to mylące, ponieważ przekazujemy funkcje jako argument do metody użycia a ta funkcja którą przekazujemy odbiera kolejną funkcję w tym miejscu. Funkcja którą otrzymujesz musi zostać wykonana aby umożliwić przejście do następnego oprogramowania pośredniego. 

ABY PRZEJŚĆ DO KOLEJNEGO OPROGRAMOWANIA POŚREDNIEGO MUSIMY WYWOŁAĆ NEXT()

Aby wysłać odpowiedz posługujemy się drugim argumentem funkcji i dodajemy send.
res.send('')

app.use((req, res, next) => {
console.log('In the middleware!');
next();
});

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send('Hello!')
});

Funkcja use ma wiele zastosowań. 

app.use([path],callback[,callback...]) - path pozwala nam odfiltrować pewne żądania, jednak działa to trchę inaczej niż poprzednio.Następnie jest callback, funkcja która powinna zostać wykonana i możem mieć wiecej niż jedno wywołanie zwrotne, możemy mieć tyle ile chcemy, możemy również mieć wiele filtrów ścieżki. 

Kolejną paczką którą należy zainstalować jest npm install --save body-parser

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded())

Urlencoded to funkcja którą musisz wykonać i możesz przekazać opcje aby ją skonfigurować. 

Extended ustawione na false umożliwia analizowanie innych funkcji. 

Możemy analizwoać przychodzące żądania z pomocą pakietu parsera. Parser to oprogramowanie typu Midleware - pośrednie. 

Zamiast korzystać z use możemy skorzystać z get. App get oprócz filtrowania ścieżki pozwala na filtrowanie żądania. Oprócz get istnie również post. 

GET oznacza pobieranie a POST wysyłanie. Jest to inny sposób korzystania z Midleware. 

Istnieją również metody DELETE, PATCH, ... .

USING EXPRESS ROUTING

Routing umożliwia sprawne poruszanie się pomiędzy aplikacją rozbitą na poszczególne moduły.

404

app.use((req,res,next)=>{
  res.status(404).send('<h1>Page not found</h1>')
});

Adresy nie mgą się powtarzać chyba że używamy różnych metod np.: "GET" i "POST".

SERVING HTML PAGES

//SENDFILE

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
});

__dirname - zmienna globalna która przechwouje bezwględną ścieżkę. Metoda join łączy segmenty view shop.html ... . Możemy używać takiego rozwiązania na systemie Win, Linux.

Za pomocą funkcji pomocnika możemy uzyskać katalog nadrzędny. 

dirname() - zwraca nazwę 
process - globalna zmienna procesowa
mainModule - główny moduł który uruchamia aplikacje
filename - wywołanie nazwy

SERVING FILES STATICALLY
Aby móc obsługiwać pliki statycznie czyli np.: zewnętrzne pliki css, należy dodać funkcje, którą oferuje express. 
app.use(express.static(path.join(__dirname, 'public')))

A w pliku HTML kod kierujący do pliku css.
    <link rel="stylesheet" href="/css/main.css">

6. WORKING WITH DYNAMIC CONTENT & ADDING TEMPLATING ENGINES
SHARING DATA ACROSS REQUEST & USERS
W app.js dodajemy:
app.use('/admin', adminData.routes);

Dane administratora odnoszą się do całego eksportu. 
W admin.js eksportujemy następujące rzeczy:
exports.router=router;
exports.products=products;

W admin.js tworzymy tablicę oraz dodajemy do niej produkt:
const products = [];
products.push({title: req.body.title})

W shop.js importujemy adminData:
const adminData = require('./admin')
console.log(adminData.products)

TEMPLATING ENGINES
Silnik templacyjny działa w następujący sposób. Mamy szablon html, zawartość węzła (tablica produktów), silnik szablonowy który rozumie pewną składnię dla której skanuje szablon i zastępuje pewną treść zawartą w dokumencie HTML. Wyniki są generowane w locie. Następnie to wszystko jest wysyłane z powrotem do użytkownika. Strona nie jest zakodowana na sztywno tylko generowana w locie.  Silniki pozwalają na wstrzykiwanie treści w sposób dynamiczny.
DOSTĘPNE SILNIKI 
- EJS
- PUG (JADE)
- HANDLEBARS

PUG
Na wstępie należy ustawić globalną konfigurację:
app.set('view engine','pug')
app.set('views','views')

Wiersz pierwszy oznacza że używamy template engine – pug, drugi zaś że widok znajduje się w folderze widok. 
Tworzymy plik shop.pug
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title My Shop
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product

A następnie w pliku shop.js odwołujemy się do renderowania domyślnego:
router.get('/', (req, res, next) => {
  res.render();
});

OUTPUTTING DYNAMIC CONTENT
W pliku shop.js przekazujemy dane w sposób dynamiczny do pliku shop.pug który jest odzwierciedleniem pliku shop.html
router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {prods: products, docTitle: 'Shop'});
});

Shop.pug i jego składania prezentuje się następująco:
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title #{docTitle}
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product

Istnieje możliwość dodawania pętli each product in prods oraz instrukcji warunkowych if products.lenght > 0 i  zmiennych #{products.title}.
Na dodawanie więcej niż jednego stylu lub bloku pozwala block.
block style
Gdy chcemy dodać tzw. layout możemy rozszerzyć inny plik:
extends layouts/main-layouts
block content
    h1 Page Not Found!

HANDLEBARS

W pierwszej kolejności importujemy nowy silnik ponieważ nie jest on wbudowany. 

const expressHbs = require('express-handlebars')

W następnej kolejności musimy przygotować wywołanie i zainicjalizować silnik.

app.engine('handlebars',expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'handlebars'}))
app.set('view engine', 'handlebars');

W pliku logiki ustawiamy hasProducts:

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {prods: products, pageTitle: 'Shop', path: '/', hasProducts: products.length>0});
});

Treść dynamiczną wprowadzamy w nasępujący sposób {{pageTitle}} Możemy używać instrukcji warunkowych {{#if hasProducts}} ... {{else}} ... {{/if}} lub pętli {{#each}} ... {{/each}}

W Handlebars nie ma możliwości tworzenia typowych bloków. Możemy używać nawiasów 3x{} - {{{ body }}}

EJS

W EJS aby wstawić kod w sposób dynamiczny używamy <%= ... %>
Instrukcje warunkowe wstawiamy w Vanila JS - <% if (prods.lenght>0) { %> ... <% } %> tak jak i pętle <% for (let product of prods){%> ... <% } %>

Możemy tworzyć globalny layout. Importuje w następujący sposób poszczególne części: <%- include('includes/head.ejs') %>

MVC - MODEL VIEW CONTROLLER 
MVC to kontroler widoku modelu (pracujemy z modelami, widokami, kontrolerami). Modele to obiekty lub części kodu które odpowiadają za reprezentowanie danych w kodzie i pozwalają na pracę z danymi (zapisywanie, pobieranie). Widok jest odpowiedzialny za to co użytkownik widzi na końcu, są one odpowiedzialne za renderowanie odpowiedniej zawartości w naszych dokumentach HTML i wysyłanie jej do użytkownika. Kontrolery są punktem połączenia między modelami a widokami – wszelkie operacje na danych nadal są wykonywane za pomocą modeli a kontrolery przenoszą dane do widoków. Kontroler zawiera logikę pośrednią. Routes są to trasy które definiują na której/dla której ścieżki powinna być wykonywana metoda http, którą powinien wykonać kod kontrolera. Kontroler staje się w tedy rzeczą z którą definiuje się model do pracy i widok do renderowania. 
Nasz kod dzielimy na bloki, przygotowujemy folder controller a w nim products.js. Product.js: eksportuje funkcję getAddProduct.
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
}
Którą następnie importujemy 
const productController = require('../controllers/products')
i łapiemy w Routes:
router.get('/add-product', productController.getAddProduct);
Model tworzymy w osobnym folderze np.: poprzez klase (ES6). Używamy tutaj metody save() która zapisuje dane i static fetchAll która zwraca produkt.
const products = [];

module.exports = class Product {
    constructor(title){
        this.title = title;
    }
    save(){
        products.push(this)
    }

    static fetchAll(){
        return this.products
    }
}
W kontrolerze products importujemy model klasy:
const Product = require('../models/product')
odwołując się do niego nie zapominamy o metodzie save:
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save()
    res.redirect('/');
};

Zapisując dane do pliku a nie do tablicy musimy zaimportować moduł fs w module. Powinien on zostać utworzony w specjalnej ścieżce path (aby działało na wszystkich systemach operacyjnych).
const fs =require('fs')
const path = require('path')
Modyfikujemy klasę dodając path oraz fs – który odczyta zawartość pliku - fs.readFile(p) – odczytam plik na tej ścieżce. Zawsze używamy funkcji strzałkowej aby nie zmienić kontekstu i odnosić się do klasy. 
const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
}

static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};

Nasz kontroler products.js wygląda następująco:
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
