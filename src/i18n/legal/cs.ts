import type { LegalBundle } from './types'

export const cs: LegalBundle = {
  terms: {
    metaTitle: 'Podmínky služby — MLightCAD',
    metaDescription:
      'Podmínky služby webů MLightCAD, open source projektů a komerčních licencí na software prodávaných přes Paddle.',
    eyebrow: 'Právní informace',
    title: 'Podmínky služby',
    updated: 'Poslední aktualizace: 24. srpna 2026',
    intro:
      'Tyto Podmínky služby („Podmínky“) upravují váš přístup k webům MLightCAD, dokumentaci, open source softwaru a placeným komerčním licencím (včetně Proprietary DWG Parser). Používáním našich webů nebo nákupem licence s těmito Podmínkami souhlasíte.',
    sections: [
      {
        title: '1. Kdo jsme',
        paragraphs: [
          'MLightCAD („my“) poskytuje open source CAD infrastrukturu pro web a komerční licence na software pro firemní zákazníky. Náš hlavní web je https://mlightcad.com.',
          'Dotazy k licencím, fakturaci nebo podpoře zasílejte na support@mlightcad.com.',
        ],
      },
      {
        title: '2. Open source software',
        paragraphs: [
          'Open source komponenty zveřejněné MLightCAD (například cad-viewer a související balíčky na GitHubu) se licencují podle příslušných open source licencí uvedených v každém repozitáři. Nic v těchto Podmínkách tato licenční ujednání neomezuje.',
        ],
      },
      {
        title: '3. Komerční licence',
        paragraphs: [
          'Placené produkty včetně Proprietary DWG Parser (@mlight-cad/dwg-converter) se prodávají jako komerční licence na software firmám a organizacím. Na každý nákup se vztahuje samostatná licenční smlouva, která stanoví povolené použití, omezení, dodání a rozsah podpory.',
          'Není-li písemně výslovně uvedeno jinak, komerční licence nezahrnují zdrojový kód. Proprietární parser nesmíte redistribuovat ani přeprodávat jako samostatnou knihovnu nebo SDK.',
        ],
      },
      {
        title: '4. Objednávky a platba',
        paragraphs: [
          'Komerční licence lze zakoupit prostřednictvím našeho poskytovatele pokladny Paddle, který u příslušných transakcí vystupuje jako Merchant of Record. Ceny, daně a měna se zobrazují u pokladny.',
          'Přístup k licencovaným balíčkům se poskytuje digitálně po úspěšné platbě. Pokyny k dodání se zasílají na e-mailovou adresu uvedenou u pokladny.',
        ],
      },
      {
        title: '5. Přípustné použití',
        paragraphs: ['Souhlasíte, že nebudete:'],
        list: [
          'Používat naše služby k protiprávním účelům nebo v rozporu s předpisy o vývozu, sankcích či duševním vlastnictví.',
          'Pokoušet se o zpětnou analýzu, dekompilaci nebo extrakci zdrojového kódu z proprietárních balíčků, s výjimkou případů, kdy to použitelné právo výslovně dovoluje.',
          'Narušovat bezpečnost nebo dostupnost našich webů, pokladny nebo systémů dodání.',
          'Zkreslovat svůj vztah k MLightCAD nebo přeprodávat proprietární balíčky mimo rozsah vaší licence.',
        ],
      },
      {
        title: '6. Vyloučení záruk',
        paragraphs: [
          'V maximálním rozsahu povoleném právem jsou naše weby a software poskytovány „tak, jak jsou“ a „podle dostupnosti“. Odmítáme veškeré záruky, výslovné i implicitní, včetně implicitních záruk prodejnosti, vhodnosti k určitému účelu a neporušení práv.',
          'Parsování a vykreslování CAD závisí na obsahu výkresu a prostředí nasazení. Zodpovídáte za ověření vhodnosti pro svůj produkční případ použití.',
        ],
      },
      {
        title: '7. Omezení odpovědnosti',
        paragraphs: [
          'V maximálním rozsahu povoleném právem MLightCAD nenese odpovědnost za nepřímé, nahodilé, zvláštní, následné nebo sankční škody ani za ztrátu zisku, dat nebo obchodních příležitostí vzniklé v souvislosti s používáním našich webů nebo softwaru.',
          'Naše souhrnná odpovědnost za jakýkoli nárok související s nákupem komerční licence je omezena na částku, kterou jste nám za tuto licenci zaplatili v období dvanácti (12) měsíců před událostí, která nárok založila, s výjimkou případů, kdy je takové omezení právem zakázáno.',
        ],
      },
      {
        title: '8. Změny',
        paragraphs: [
          'Tyto Podmínky můžeme čas od času aktualizovat. Datum „Poslední aktualizace“ označuje nejnovější verzi. Podstatné změny budou zveřejněny na této stránce. Pokračující používání našich služeb po nabytí účinnosti změn znamená přijetí revidovaných Podmínek.',
        ],
      },
      {
        title: '9. Rozhodné právo',
        paragraphs: [
          'Tyto Podmínky se řídí právem použitelným na MLightCAD jako prodávajícího, bez ohledu na kolizní normy. Závazná ochrana spotřebitele ve vaší jurisdikci zůstává, pokud se uplatní, nedotčena.',
        ],
      },
      {
        title: '10. Kontakt',
        paragraphs: ['Dotazy k těmto Podmínkám: support@mlightcad.com'],
      },
    ],
  },
  privacy: {
    metaTitle: 'Zásady ochrany osobních údajů — MLightCAD',
    metaDescription:
      'Jak MLightCAD shromažďuje, používá a chrání osobní údaje na svých webech a při nákupu komerčních licencí.',
    eyebrow: 'Právní informace',
    title: 'Zásady ochrany osobních údajů',
    updated: 'Poslední aktualizace: 24. srpna 2026',
    intro:
      'Tyto Zásady ochrany osobních údajů vysvětlují, jak MLightCAD („my“) zpracovává osobní údaje, když navštívíte naše weby, požádáte o zkušební licenci nebo zakoupíte komerční licenci na software.',
    sections: [
      {
        title: '1. Údaje, které shromažďujeme',
        paragraphs: ['Podle toho, jak s námi komunikujete, můžeme shromažďovat:'],
        list: [
          'Kontaktní údaje, jako je jméno, název společnosti, pracovní e-mail a země nebo region.',
          'Fakturační a transakční informace zpracovávané naším poskytovatelem plateb (Paddle), včetně stavu objednávky, zaplacené částky a daňových údajů potřebných k fakturaci.',
          'Technické údaje, jako je IP adresa, typ prohlížeče, informace o zařízení a navštívené stránky, shromažďované prostřednictvím serverových protokolů nebo analytických nástrojů.',
          'Komunikaci podpory a údaje žádosti o zkušební licenci, které nám dobrovolně zašlete e-mailem nebo formulářem.',
        ],
      },
      {
        title: '2. Jak údaje používáme',
        paragraphs: ['Osobní údaje používáme k:'],
        list: [
          'Poskytování, dodání a podpoře komerčních licencí na software.',
          'Zpracování plateb a plnění objednávek.',
          'Odpovědím na žádosti o podporu a o zkušební licenci.',
          'Odesílání transakčních zpráv souvisejících s nákupy, přístupem nebo problémy s účtem.',
          'Zlepšování našich webů, dokumentace a produktů.',
          'Plnění právních, daňových a účetních povinností.',
        ],
      },
      {
        title: '3. Zpracování plateb',
        paragraphs: [
          'Komerční pokladnu zajišťuje Paddle.com Market Limited a její přidružené společnosti („Paddle“), které u příslušných transakcí vystupují jako Merchant of Record. Při nákupu licence Paddle shromažďuje platební a zákaznické údaje potřebné k dokončení objednávky.',
          'Paddle zpracovává osobní údaje podle vlastní politiky ochrany soukromí. Obdržíme údaje o objednávce a zákazníkovi potřebné k dodání licence a poskytnutí podpory.',
        ],
      },
      {
        title: '4. Sdílení informací',
        paragraphs: ['Osobní údaje neprodáváme. Informace můžeme sdílet s:'],
        list: [
          'Poskytovateli služeb, kteří nám pomáhají provozovat weby, dodávat přístup k softwaru nebo poskytovat podporu (například hosting, e-mail nebo distribuce balíčků přes GitHub/npm).',
          'Paddle a souvisejícími poskytovateli plateb, daní a prevence podvodů pro pokladnu a fakturaci.',
          'Orgány, pokud to vyžaduje právo nebo za účelem ochrany našich práv, práv uživatelů či veřejného zájmu.',
        ],
      },
      {
        title: '5. Uchovávání údajů',
        paragraphs: [
          'Údaje uchováváme po dobu potřebnou ke splnění účelů popsaných v těchto zásadách, včetně dodání licence, podpory, daňových záznamů a řešení sporů, pokud delší dobu uchování nevyžaduje právo.',
        ],
      },
      {
        title: '6. Zabezpečení',
        paragraphs: [
          'K ochraně osobních údajů používáme přiměřená administrativní, technická a organizační opatření. Žádný způsob přenosu ani uložení není zcela bezpečný a absolutní bezpečnost nemůžeme zaručit.',
        ],
      },
      {
        title: '7. Vaše práva',
        paragraphs: [
          'Podle vaší polohy můžete mít právo na přístup, opravu, výmaz nebo omezení zpracování osobních údajů, nebo vznést námitku proti určitému zpracování. K uplatnění těchto práv kontaktujte support@mlightcad.com. Před odpovědí můžeme potřebovat ověřit vaši totožnost.',
        ],
      },
      {
        title: '8. Mezinárodní přenosy',
        paragraphs: [
          'My a naši poskytovatelé služeb můžeme zpracovávat informace v jiných zemích, než je vaše. Tam, kde je to vyžadováno, se opíráme o vhodné záruky pro přeshraniční přenosy.',
        ],
      },
      {
        title: '9. Děti',
        paragraphs: [
          'Naše komerční produkty a pokladna jsou určeny firmám a organizacím. Osobní údaje dětí vědomě neshromažďujeme.',
        ],
      },
      {
        title: '10. Změny a kontakt',
        paragraphs: [
          'Tyto Zásady ochrany osobních údajů můžeme čas od času aktualizovat zveřejněním revidované verze na této stránce. Dotazy: support@mlightcad.com.',
        ],
      },
    ],
  },
  refund: {
    metaTitle: 'Zásady vrácení peněz — MLightCAD',
    metaDescription:
      'Zásady vrácení peněz za komerční licence na software MLightCAD zakoupené přes Paddle, včetně věčných licencí a ročních balíčků aktualizací.',
    eyebrow: 'Právní informace',
    title: 'Zásady vrácení peněz',
    updated: 'Poslední aktualizace: 24. srpna 2026',
    intro:
      'Tyto Zásady vrácení peněz se vztahují na komerční licence na software prodávané MLightCAD přes Paddle, včetně věčné licence Proprietary DWG Parser a ročních balíčků aktualizací.',
    sections: [
      {
        title: '1. Digitální produkty',
        paragraphs: [
          'Naše placené produkty jsou digitální licence na software dodávané elektronicky (například přístup k npm balíčku a pokyny e-mailem). Fyzické zboží se neodesílá.',
        ],
      },
      {
        title: '2. Obecná pravidla',
        paragraphs: [
          'Protože licence poskytují okamžitý přístup k proprietárnímu softwaru, jsou všechny prodeje po dodání nebo aktivaci přístupu zpravidla konečné, s výjimkou případů, kdy vrácení peněz vyžaduje použitelné právo nebo je výslovně písemně schválíme.',
          'Pokud se domníváte, že nákup byl učiněn omylem, kontaktujte support@mlightcad.com do čtrnácti (14) dnů od nákupu a před podstatným použitím nebo nasazením. Žádosti o vrácení posuzujeme individuálně.',
        ],
      },
      {
        title: '3. Věčná licence',
        paragraphs: [
          'Věčná licence je jednorázový nákup, který umožňuje další používání licencované verze balíčku podle příslušných licenčních podmínek. Vrácení peněz lze zvážit, pokud přístup ještě nebyl zřízen nebo došlo k duplicitnímu zúčtování.',
        ],
      },
      {
        title: '4. Roční balíčky aktualizací',
        paragraphs: [
          'Roční balíčky aktualizací poskytují přístup k novým upgrade vydáním na další rok. Verzi, kterou již máte licencovanou, můžete používat i bez nákupu aktualizací.',
          'Pokud roční balíček aktualizací zrušíte nebo požádáte o vrácení peněz, přístup k budoucím vydáním aktualizací v daném období předplatného může skončit. Poplatky za dokončená zúčtovací období zpravidla nelze vrátit, pokud to právo nevyžaduje.',
        ],
      },
      {
        title: '5. Jak požádat o vrácení peněz',
        paragraphs: ['Napište na support@mlightcad.com a uveďte:'],
        list: [
          'Název společnosti a kontaktní e-mail použitý u pokladny.',
          'Referenci objednávky nebo transakce Paddle, pokud je k dispozici.',
          'Zakoupený produkt (věčná licence nebo roční aktualizace).',
          'Důvod žádosti.',
        ],
      },
      {
        title: '6. Chargebacky',
        paragraphs: [
          'Máte-li problém s vyúčtováním, kontaktujte nás před zahájením chargebacku, abychom mohli pomoci záležitost vyřešit. Neoprávněné nebo zneužívající chargebacky mohou vést k pozastavení přístupu k licenci po dobu šetření sporu.',
        ],
      },
      {
        title: '7. Kontakt',
        paragraphs: ['Dotazy k vrácení peněz: support@mlightcad.com'],
      },
    ],
  },
}
