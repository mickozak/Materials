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
