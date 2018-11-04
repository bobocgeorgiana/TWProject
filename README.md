   
#                                         Appointment manager integrat cu Google Calendar


## •	Care este principala nevoie/problemă pe care o rezolvă produsul?

Produsul nostru contribuie la facilitarea gestionării timpului utilizatorilor săi, prin oferirea posibilității înregistrării și programării unor evenimente. Acestea pot avea denumiri individuale, intervale orare și pot fi stabilite multiple notificări, în funcție de preferințele utilizatorului, la începerea evenimentului respectiv sau cu câteva minute, ore, zile sau săptămâni înainte de acesta. 

## •	Cărui tip de utilizatori se adresează produsul?

Produsul se adresează unei game largi de utilizatori, neavând limite strict impuse. Ştiind că timpul este singura resursă irecuperabilă, organizarea evenimentelor este un lucru absolut necesar şi benefic pentru oricine. Astfel, aplicaţia noastră va fi utilă oricărei persoane cu un program încărcat, ce are nevoie de o organizare eficientă a timpului său. 
În plus, produsul poate fi utilizat atât de către persoanele fizice, ce au oportunitatea de a-şi structura propriul program, precum orele de muncă, întâlnirile personale sau profesionale, dar şi timpul liber, cât şi de către persoanele juridice, ce pot folosi aplicaţia pentru sistematizarea productivă a afacerilor, prin constituirea unei ordini la nivelul clienţilor.

## •	Ce alte produse similare există pe piață?

Există numeroase aplicații ce au fost realizate prin integrarea facilităților oferite de Google Calendar. Printre facilitățile oferite de acestea se enumeră preluarea automată în calendar a evenimentelor din Gmail, permiterea accesului altor persoane la calendar, dar și primirea unor notificări cu privire la evenimentele programate.
**Acuity Scheduling** este o aplicație mobilă ce integrează funcționalitățile oferite de Google Calendar și poate fi folosită atât pe dispozitive cu sistem de operare Android, cât și Apple iOS. Aceasta permite adăugarea unor evenimente, modificarea sau ștergerea acestora și are o interfață ușor de utilizat.
**Bookafy** este un sistem online de gestionare a unor evenimente ce este destinat fie utilizării în scop personal, fie pentru gestionarea eficientă a timpului în cadrul unor companii. Toate aplicațiile ce integrează Google Calendar încearcă să aducă și anumite facilități specifice lor care să le diferențieze de celelalte.
Funcționalitatea specifică aplicației noastre este că spre deosebire de celelalte aplicații existente pe piață, aceasta poate ordona evenimentele în funcție de preferințele utilizatorului atunci când aceastea se suprapun.

## • API REST

Get the entire appointments list

• GET/appointments

Response -->[ { "name": "ex1", "date": "12.12.2012", "message": "dinner with Jon", "score": "5" } ]

Search by appointment name

• GET/appointments?search=name&orderBy=date

Response -->[ { "name": "ex2", "date": "13.13.2013", "message": "clean your room" } ]

Search by certain date

• GET/appointments?search=date

Response -->[ { "date": "13.13.2013", "message": "clean your room" } ]

Order same date events by preferences

• GET/appointments?search=date&orderBy=score

Response -->[ { "date": "13.13.2013", "message": "clean your room", "score": "4" } ]

Add a new event

• POST/event

Give a score to an existing appointment

• POST/score

![alt text](https://github.com/bobocgeorgiana/TWProject/blob/master/a244SRSI.png "Poza")
