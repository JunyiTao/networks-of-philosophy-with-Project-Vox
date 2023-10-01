


# Missing Data
1. check those who have no wkipage
2. check those whoes birthdate is vague


# Messy Data
1. Four lists of influenced
    a. merge
    b. A influences B
       B is influenced by A 
       these two lists may not be identical

# Graph Representation
1. How to deal with the case that two philosophers influence each other (bidirectional)? 

# Perspectives
1. other subjects and identities of those philosophers


----------------------------------------------------
(base) C:\Users\zhenj\Box\Porfolio\Projects\Project Vox\Data\philosopher_influence\scrape>scrapy runspider C:\Users\zhenj\Box\Porfolio\Projects\Project Vox\Data\philosopher_influence\scrape\schoolofathens/spiders/philosopher_spider.py -o quotes.jl

cd C:/Users/zhenj/Box/Porfolio/Projects/Project Vox/Data/philosopher_influence/scrape
scrapy crawl schoolofathens



on Sep 20, 2020
https://github.com/S4N0I/theschoolofathens

DBpedia
https://www.dbpedia.org/resources/linked-data/


thoughts
[] revise the orginal code
[] crawl dbpedia: 
[] use dbpedia: https://medium.com/virtuoso-blog/dbpedia-basic-queries-bc1ac172cc09; https://www.youtube.com/watch?v=zdaL6unnv7Y



- use the list: shall we still use wikipedia-philosopher list to show the bias? Can dbpedia replace it?
https://en.wikipedia.org/wiki/List_of_philosophers_(A%E2%80%93C)

https://en.wikipedia.org/wiki/Lists_of_philosophers
[] list of women philosophers



The next step is to extract this information. For this we need two things: a SPARQL endpoint (try snorql), which is an online interface to submit our queries and little knowledge of SPARQL a specialist language for querying the semantic web. This is a big (and exciting) area that has to do with querying information that is structured in triples (subject-relationship-object). I assume it has its roots in predicate logic so the analytical philosophers would have been pleased. However the downside is that the language itself a lot more difficult to learn than say SQL and to complicate things still further you need to know the ontological structure of the resource you are querying. I probably wouldn’t have got anywhere at all were it not for a great blog post by Bob DuCharme which is a simple guide for getting the information out of wikipedia.
http://www.snee.com/bobdc.blog/2007/11/querying-dbpedia.html
In the end the query I needed was very simple. You can test it by submitting it in snorql.
https://dbpedia.org/snorql/?query=SELECT+*%0D%0AWHERE+%7B%0D%0A%3Fp+a+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2FPhilosopher%3E+.%0D%0A%3Fp+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2Finfluenced%3E+%3Finfluenced.%0D%0A%7D

SELECT *
WHERE {
?p a <http://dbpedia.org/ontology/Philosopher> .
?p <http://dbpedia.org/ontology/influenced> ?influenced.
}

It then needed a bit of cleaning as the punctuation was coded for URLS. For this I used the following online URL decoder.


==================
Reasons:
- language
    - no page in en.wiki
    - different notations 拼音
- label-name mismatch
    - middle name 
    - suffix (xxx of xxx)
    - multiple persons share the same name so there is a differentiater (xxx)

Pattern:
- if dbUrl and not wikiUrl => label is at least refered to by some pages
- if not dbUrl => label doesn't exist 
     


==============================included in dbpedia but not in wikipedia
at least they are refered to in some pages

different languages:
[
    'https://de.wikipedia.org/wiki/Ilaria_Brocchini',
    'https://pl.wikipedia.org/wiki/Izydora_D%C4%85mbska',
    'https://zh.wikipedia.org/wiki/%E9%99%B3%E7%8D%BB%E7%AB%A0',
    'https://zh.m.wikipedia.org/zh-hans/%E7%84%A6%E7%AB%91',
    'https://pt.wikipedia.org/wiki/Carlos_Nelson_Coutinho',
    'https://es.wikipedia.org/wiki/Raimundo_de_Farias_Brito',
    'https://de.wikipedia.org/wiki/Joseph_Geyser',
    'https://de.wikipedia.org/wiki/Reinhardt_Grossmann',
    'https://fr.wikipedia.org/wiki/Lucien_Laberthonni%C3%A8re',
    'https://fr.wikipedia.org/wiki/Jules_Lachelier',
    'https://de.wikipedia.org/wiki/Arthur_Liebert',
    'https://de.wikipedia.org/wiki/Minagawa_Kien',
    'https://de.wikipedia.org/wiki/William_Penbygull',
    'https://de.wikipedia.org/wiki/Joseph_Petzoldt',
    'https://de.wikipedia.org/wiki/Franti%C5%A1ek_Weyr',
    'https://de.wikipedia.org/wiki/Ota_Weinberger'
]


--- means no page, need research
by 6/3/2022

'Ilaria Brocchini',
https://dbpedia.org/page/Ilaria_Brocchini
'Izydora Dąmbska',
https://dbpedia.org/page/Izydora_Dąmbska
'Abd al-Jabiri',
https://dbpedia.org/page/Abd_al-Jabiri
'Dorion Cairns',
https://dbpedia.org/page/Dorion_Cairns
'Mario Calderoni',
https://dbpedia.org/page/Mario_Calderoni
'Ch'en Hsien-chang',
https://dbpedia.org/page/Ch'en_Hsien-chang
'Chiao Hung',
https://dbpedia.org/page/Chiao_Hung
'Tasan Chông Yagyong',
https://dbpedia.org/page/Tasan_Chông_Yagyong
'Carlos Nelson Coutinho',
https://dbpedia.org/page/Carlos_Nelson_Coutinho
'Raimundo de Farias Brito',
https://dbpedia.org/page/Raimundo_de_Farias_Brito
-----'Erich Frank', 
https://dbpedia.org/page/Erich_Frank
-----'Gadadhara Bhattacharya',
https://dbpedia.org/page/Gadadhara_Bhattacharya
'Joseph Geyser',
https://dbpedia.org/page/Joseph_Geyser
'Reinhardt Grossmann',
https://dbpedia.org/page/Reinhardt_Grossmann
'Axel Anders Theodor Hagerstrom',
https://dbpedia.org/page/Axel_Anders_Theodor_Hagerstrom
-----'David Walter Hamlyn',
https://dbpedia.org/page/David_Walter_Hamlyn
---Karl Heim?---'Carl Heim',
https://dbpedia.org/page/Carl_Heim
-----'Ronald William Hepburn',
https://dbpedia.org/page/Ronald_William_Hepburn
----film director?---'Sergei Iosifovich Hessen',
https://dbpedia.org/page/Sergei_Iosifovich_Hessen
----胡宏----'Hu Hung',
https://dbpedia.org/page/Hu_Hung
---Friedrich Wilhelm Joseph Schelling?-------'Friedrich Jodl',
https://dbpedia.org/page/Friedrich_Jodl
-----'Lev Platonovich Karsavin', https://www.encyclopedia.com/humanities/encyclopedias-almanacs-transcripts-and-maps/karsavin-lev-platonovich-1882-1952
https://dbpedia.org/page/Lev_Platonovich_Karsavin
---Joseph Caspi?----'Joseph Kaspi',
https://dbpedia.org/page/Joseph_Kaspi
-----'Aleksei Aleksandrovich Kozlov',
https://dbpedia.org/page/Aleksei_Aleksandrovich_Kozlov
fr'Lucien Laberthonnière',
https://dbpedia.org/page/Lucien_Laberthonnière
fr'Jules Lachelier',
https://dbpedia.org/page/Jules_Lachelier
-----'Ivan Ivanovich Lapshin',
https://dbpedia.org/page/Ivan_Ivanovich_Lapshin
'Liang Sou-ming',
https://dbpedia.org/page/Liang_Sou-ming
de'Arthur Liebert',
https://dbpedia.org/page/Arthur_Liebert
'Liu Tsung-chou', => "Liu Zongzhou"
https://dbpedia.org/page/Liu_Tsung-chou
-----'Charles B. Martin',
https://dbpedia.org/page/Charles_B._Martin
de'Minagawa Kien',
https://dbpedia.org/page/Minagawa_Kien
'Mou Tsung-san', => "Mou Zongsan"
https://dbpedia.org/page/Mou_Tsung-san
de'William Penbygull',
https://dbpedia.org/page/William_Penbygull
de'Joseph Petzoldt',
https://dbpedia.org/page/Joseph_Petzoldt
'Pseudo-Grosseteste', = "Pseudo-Dionysius the Areopagite"
https://dbpedia.org/page/Pseudo-Grosseteste
'Rgyal tshab dar ma rin chen', => "Gyaltsab Darma Rinchen" => "Gyaltsab Je"
https://dbpedia.org/page/Rgyal_tshab_dar_ma_rin_chen
-----'Johannes Sharpe',
https://dbpedia.org/page/Johannes_Sharpe
'T'ang Chun-i', => "Tang Chun-i"
https://dbpedia.org/page/T'ang_Chun-i
'George Turnball', =>"George Turnbull (theologian)"
https://dbpedia.org/page/George_Turnball
'Gabriel Vazquez', => "Gabriel Vásquez"
https://dbpedia.org/page/Gabriel_Vazquez
'Boris Petrovich Vysheslavtsev', => "Boris Vysheslavtsev"
https://dbpedia.org/page/Boris_Petrovich_Vysheslavtsev
de'Ota Weinberger',
https://dbpedia.org/page/Ota_Weinberger
de'Frantisek Weyr',
https://dbpedia.org/page/Frantisek_Weyr
-----'Yi Kan', Yi Kan was a major Korean neo-Confucian thinker. https://www.rep.routledge.com/articles/biographical/yi-kan-1677-1727/v-1
https://dbpedia.org/page/Yi_Kan
-----'Philip Zhai',
https://dbpedia.org/page/Philip_Zhai



