/* مصروفي (Masroufi) — Smart Expense Manager MVP
 * Offline-first, no sign-up, all data stays on the device (localStorage).
 * Implements PRD v1.0 P0 scope: onboarding + salary, quick add (≤3 taps), auto-categorization
 * that learns from corrections, categories, weekly report, salary/budget & "safe to spend today",
 * notifications (local), edit/delete/search/filter, backup export/import.
 */
'use strict';
(() => {
const KEY = 'masroufi.v1';
const APP_VERSION = '1.3.0';

/* ------------------------------------------------------------------ i18n */
const S = {
ar: {
  appName:'مصروفي', home:'الرئيسية', txns:'المصروفات', reports:'التقارير', settings:'الإعدادات',
  safeToday:'المسموح اليوم', ofDaily:'من أصل {x} يومياً', daysToSalary:'باقي {n} يوم للراتب',
  overToday:'تجاوزت المسموح اليوم', remaining:'المتبقي من الراتب', spentOf:'صرفت {a} من {b}',
  onTrack:'✅ ماشي صح، بهذا المعدل يكفيك راتبك ليوم الراتب', runOut:'⚠️ بهذا المعدل راح تخلّص راتبك يوم {d}',
  runOutNow:'⚠️ خلّص المتبقي من راتبك لهذه الدورة', noSpendYet:'سجّل مصروفاتك ليظهر توقّع نهاية الشهر',
  recent:'آخر العمليات', seeAll:'عرض الكل', empty:'ما في مصروفات بعد. اضغط + وسجّل أول مصروف في ثواني.',
  newReport:'📊 تقريرك الأسبوعي جاهز', open:'افتح',
  backupTip:'بياناتك محفوظة على جهازك فقط. إذا غيّرت جوالك أو حذفت التطبيق، صدّر نسخة احتياطية من الإعدادات.', gotIt:'فهمت',
  remindBanner:'سجّلت كل مصروفاتك اليوم؟', addNow:'سجّل الآن',
  addExpense:'إضافة مصروف', editExpense:'تعديل مصروف', notePh:'ملاحظة أو اسم المتجر (اختياري)',
  save:'حفظ', delete:'حذف', cancel:'إلغاء', close:'إغلاق', suggested:'✨ مقترح',
  saved:'تم حفظ المصروف', updated:'تم التعديل', deleted:'تم الحذف', undo:'تراجع', enterAmount:'أدخل المبلغ أولاً',
  date:'التاريخ', today:'اليوم', yesterday:'أمس',
  search:'ابحث بالملاحظة أو الفئة...', allCats:'كل الفئات', thisCycle:'دورة الراتب', thisMonth:'هذا الشهر', all:'الكل',
  total:'الإجمالي', noResults:'لا توجد نتائج', count:'{n} عملية',
  weekly:'التقرير الأسبوعي', thisWeek:'الأسبوع الحالي (يتحدّث مباشرة)', history:'سجل التقارير', noHistory:'أول تقرير أسبوعي يوصلك يوم {d}.',
  totalSpent:'إجمالي المصروف', vsLast:'عن الأسبوع الماضي', same:'نفس الأسبوع الماضي', noPrev:'لا يوجد أسبوع سابق للمقارنة',
  whereSpent:'وين صرفت', topExpenses:'أكبر 3 مصروفات', topDay:'أكثر يوم صرفت فيه كان {d}', budgetStatus:'حالة الميزانية',
  budgetLine:'صرفت {p}% من راتبك وباقي {n} يوم', tip:'💡 نصيحة الأسبوع', nothing:'لا مصروفات في هذه الفترة',
  tipCat:'مصروف {c} زاد {p}% عن معدلك. لو رجّعته لمعدله الطبيعي توفّر حوالي {x} بالشهر.',
  tipPace:'صرفت {p}% من راتبك ومضى {e}% فقط من الدورة. حاول ما تتجاوز {x} يومياً.',
  tipShare:'{c} يمثّل {p}% من صرفك هذا الأسبوع. لو قلّلته مرتين بالأسبوع توفّر حوالي {x} بالشهر.',
  tipGood:'أداء ممتاز! صرفك ضمن الميزانية. استمر 👏', tipNone:'ما سجّلت مصروفات هذا الأسبوع. التسجيل اليومي هو سر الوعي المالي.',
  back:'رجوع', week:'أسبوع', byCycle:'حسب الفئة — دورة الراتب الحالية',
  general:'عام', language:'اللغة', theme:'المظهر', themeAuto:'تلقائي', themeLight:'فاتح', themeDark:'داكن',
  currency:'العملة', country:'الدولة والعملة', searchCountry:'ابحث عن دولة أو عملة...', salarySec:'الراتب والميزانية', salary:'الراتب الشهري', salaryDay:'يوم استلام الراتب', fixed:'التزامات ثابتة شهرية',
  fixedHint:'مثل الإيجار والأقساط. تُخصم تلقائياً، فلا تسجّلها كمصروف.', addIncome:'+ إضافة دخل إضافي', incomeAmount:'المبلغ', incomeSource:'المصدر (مثلاً: عمل حر)',
  incomeSaved:'تمت إضافة الدخل', incomes:'دخل إضافي هذه الدورة',
  notifSec:'الإشعارات والتقرير', reportDay:'يوم التقرير الأسبوعي', reminder:'تذكير يومي الساعة', enableNotif:'تفعيل الإشعارات',
  notifDenied:'الإشعارات مرفوضة من المتصفح. فعّلها من إعدادات الجهاز.', notifUnsupported:'المتصفح لا يدعم الإشعارات. على iPhone: أضف التطبيق للشاشة الرئيسية أولاً.',
  catsSec:'الفئات', addCat:'+ فئة جديدة', catName:'اسم الفئة', emoji:'أيقونة (إيموجي)', color:'اللون', catAdded:'تمت إضافة الفئة',
  delCatQ:'حذف الفئة؟ مصروفاتها ستنتقل إلى "أخرى".',
  dataSec:'البيانات والخصوصية', privacy:'إخفاء المبالغ', exportBtn:'تصدير نسخة احتياطية', importBtn:'استيراد نسخة احتياطية',
  imported:'تم استيراد البيانات', importErr:'الملف غير صالح', importQ:'سيتم استبدال كل بياناتك الحالية بالنسخة الاحتياطية. متابعة؟',
  wipe:'حذف كل البيانات', wipeQ:'سيتم حذف كل بياناتك نهائياً من هذا الجهاز. متأكد؟',
  privacyNote:'🔒 لا تسجيل ولا حساب. كل بياناتك محفوظة على جهازك فقط ولا تُرسل لأي سيرفر.',
  ob1Title:'أهلاً في مصروفي', ob1Text:'اعرف وين تروح فلوسك بدون جهد. بدون تسجيل، وبياناتك تبقى على جهازك.', chooseLang:'اختر اللغة',
  ob2Title:'راتبك الشهري', salaryQ:'كم راتبك الشهري؟', salaryDayQ:'أي يوم بالشهر يوصلك الراتب؟', fixedQ:'التزامات ثابتة شهرية (اختياري)',
  ob3Title:'جاهزين!', reportDayQ:'أي يوم يوصلك التقرير الأسبوعي؟', dailyBudget:'ميزانيتك اليومية المقترحة', start:'ابدأ', next:'التالي',
  salaryReq:'أدخل راتبك لنحسب ميزانيتك',
  salaryArrived:'وصل راتبك؟ 💰', salaryChanged:'تأكد من المبلغ، وعدّله إذا تغيّر.', confirm:'تأكيد', later:'لاحقاً', salaryConfirmed:'بدأت دورة راتب جديدة 🎉',
  remindTitle:'سجّلت كل مصروفاتك اليوم؟', remindBody:'سجّلها الآن في ثواني', reportTitle:'تقريرك الأسبوعي جاهز 📊', reportBody:'شوف وين راحت فلوسك هذا الأسبوع',
},
en: {
  appName:'Masroufi', home:'Home', txns:'Expenses', reports:'Reports', settings:'Settings',
  safeToday:'Safe to spend today', ofDaily:'of {x} per day', daysToSalary:'{n} days to payday',
  overToday:'Over today\'s allowance', remaining:'Left from salary', spentOf:'Spent {a} of {b}',
  onTrack:'✅ On track — at this pace your salary lasts until payday', runOut:'⚠️ At this pace you\'ll run out on {d}',
  runOutNow:'⚠️ You\'ve used up this cycle\'s budget', noSpendYet:'Log expenses to see your month-end forecast',
  recent:'Recent', seeAll:'See all', empty:'No expenses yet. Tap + to log your first one in seconds.',
  newReport:'📊 Your weekly report is ready', open:'Open',
  backupTip:'Your data lives only on this device. Export a backup from Settings before changing phones or deleting the app.', gotIt:'Got it',
  remindBanner:'Logged all of today\'s expenses?', addNow:'Log now',
  addExpense:'Add expense', editExpense:'Edit expense', notePh:'Note or merchant (optional)',
  save:'Save', delete:'Delete', cancel:'Cancel', close:'Close', suggested:'✨ Suggested',
  saved:'Expense saved', updated:'Updated', deleted:'Deleted', undo:'Undo', enterAmount:'Enter an amount first',
  date:'Date', today:'Today', yesterday:'Yesterday',
  search:'Search note or category...', allCats:'All categories', thisCycle:'Pay cycle', thisMonth:'This month', all:'All',
  total:'Total', noResults:'No results', count:'{n} items',
  weekly:'Weekly report', thisWeek:'Current week (live)', history:'Report history', noHistory:'Your first weekly report arrives on {d}.',
  totalSpent:'Total spent', vsLast:'vs last week', same:'Same as last week', noPrev:'No previous week to compare',
  whereSpent:'Where it went', topExpenses:'Top 3 expenses', topDay:'Your biggest spending day was {d}', budgetStatus:'Budget status',
  budgetLine:'You\'ve spent {p}% of your salary, {n} days left', tip:'💡 Tip of the week', nothing:'No expenses in this period',
  tipCat:'{c} spending is up {p}% vs your average. Bringing it back saves about {x} a month.',
  tipPace:'You\'ve spent {p}% of your salary with only {e}% of the cycle gone. Try to stay under {x} per day.',
  tipShare:'{c} is {p}% of this week\'s spending. Cutting it twice a week saves about {x} a month.',
  tipGood:'Great job! You\'re within budget. Keep it up 👏', tipNone:'No expenses logged this week. Daily logging is the key to awareness.',
  back:'Back', week:'Week', byCycle:'By category — current pay cycle',
  general:'General', language:'Language', theme:'Theme', themeAuto:'Auto', themeLight:'Light', themeDark:'Dark',
  currency:'Currency', country:'Country & currency', searchCountry:'Search country or currency...', salarySec:'Salary & budget', salary:'Monthly salary', salaryDay:'Payday (day of month)', fixed:'Fixed monthly commitments',
  fixedHint:'e.g. rent, installments. Deducted automatically — don\'t log them as expenses.', addIncome:'+ Add extra income', incomeAmount:'Amount', incomeSource:'Source (e.g. freelance)',
  incomeSaved:'Income added', incomes:'Extra income this cycle',
  notifSec:'Notifications & report', reportDay:'Weekly report day', reminder:'Daily reminder at', enableNotif:'Enable notifications',
  notifDenied:'Notifications are blocked. Enable them in device settings.', notifUnsupported:'Notifications not supported. On iPhone, add the app to Home Screen first.',
  catsSec:'Categories', addCat:'+ New category', catName:'Category name', emoji:'Icon (emoji)', color:'Color', catAdded:'Category added',
  delCatQ:'Delete category? Its expenses move to "Other".',
  dataSec:'Data & privacy', privacy:'Hide amounts', exportBtn:'Export backup', importBtn:'Import backup',
  imported:'Data imported', importErr:'Invalid file', importQ:'This replaces all current data with the backup. Continue?',
  wipe:'Delete all data', wipeQ:'All your data will be permanently deleted from this device. Are you sure?',
  privacyNote:'🔒 No sign-up, no account. Everything stays on your device and is never sent to a server.',
  ob1Title:'Welcome to Masroufi', ob1Text:'Know where your money goes — effortlessly. No sign-up, your data stays on your device.', chooseLang:'Choose language',
  ob2Title:'Your salary', salaryQ:'What is your monthly salary?', salaryDayQ:'Which day of the month is payday?', fixedQ:'Fixed monthly commitments (optional)',
  ob3Title:'All set!', reportDayQ:'Which day should the weekly report arrive?', dailyBudget:'Suggested daily budget', start:'Start', next:'Next',
  salaryReq:'Enter your salary so we can build your budget',
  salaryArrived:'Did your salary arrive? 💰', salaryChanged:'Confirm the amount, or edit it if it changed.', confirm:'Confirm', later:'Later', salaryConfirmed:'New pay cycle started 🎉',
  remindTitle:'Logged all of today\'s expenses?', remindBody:'Add them now in seconds', reportTitle:'Your weekly report is ready 📊', reportBody:'See where your money went this week',
},
de: {
  appName:'Masroufi', home:'Start', txns:'Ausgaben', reports:'Berichte', settings:'Einstellungen',
  safeToday:'Heute verfügbar', ofDaily:'von {x} pro Tag', daysToSalary:'noch {n} Tage bis zum Gehalt',
  overToday:'Tagesbudget überschritten', remaining:'Rest vom Gehalt', spentOf:'{a} von {b} ausgegeben',
  onTrack:'✅ Auf Kurs – bei diesem Tempo reicht dein Gehalt bis zum Zahltag', runOut:'⚠️ Bei diesem Tempo ist dein Geld am {d} aufgebraucht',
  runOutNow:'⚠️ Das Budget dieses Zyklus ist aufgebraucht', noSpendYet:'Erfasse Ausgaben, um die Monatsprognose zu sehen',
  recent:'Zuletzt', seeAll:'Alle anzeigen', empty:'Noch keine Ausgaben. Tippe auf + und erfasse die erste in Sekunden.',
  newReport:'📊 Dein Wochenbericht ist fertig', open:'Öffnen',
  backupTip:'Deine Daten liegen nur auf diesem Gerät. Exportiere vor einem Handywechsel ein Backup in den Einstellungen.', gotIt:'Verstanden',
  remindBanner:'Alle heutigen Ausgaben erfasst?', addNow:'Jetzt erfassen',
  addExpense:'Ausgabe hinzufügen', editExpense:'Ausgabe bearbeiten', notePh:'Notiz oder Händler (optional)',
  save:'Speichern', delete:'Löschen', cancel:'Abbrechen', close:'Schließen', suggested:'✨ Vorschlag',
  saved:'Ausgabe gespeichert', updated:'Aktualisiert', deleted:'Gelöscht', undo:'Rückgängig', enterAmount:'Bitte zuerst einen Betrag eingeben',
  date:'Datum', today:'Heute', yesterday:'Gestern',
  search:'Notiz oder Kategorie suchen...', allCats:'Alle Kategorien', thisCycle:'Gehaltszyklus', thisMonth:'Dieser Monat', all:'Alle',
  total:'Gesamt', noResults:'Keine Ergebnisse', count:'{n} Buchungen',
  weekly:'Wochenbericht', thisWeek:'Aktuelle Woche (live)', history:'Berichtsverlauf', noHistory:'Dein erster Wochenbericht kommt am {d}.',
  totalSpent:'Gesamtausgaben', vsLast:'ggü. Vorwoche', same:'Wie letzte Woche', noPrev:'Keine Vorwoche zum Vergleich',
  whereSpent:'Wofür ausgegeben', topExpenses:'Top 3 Ausgaben', topDay:'Dein ausgabenstärkster Tag war {d}', budgetStatus:'Budgetstatus',
  budgetLine:'{p}% deines Gehalts ausgegeben, noch {n} Tage', tip:'💡 Tipp der Woche', nothing:'Keine Ausgaben in diesem Zeitraum',
  tipCat:'Ausgaben für {c} sind um {p}% über deinem Schnitt. Zurück auf Normalniveau spart etwa {x} pro Monat.',
  tipPace:'Du hast {p}% deines Gehalts ausgegeben, aber erst {e}% des Zyklus sind vorbei. Bleib unter {x} pro Tag.',
  tipShare:'{c} macht {p}% deiner Ausgaben dieser Woche aus. Zweimal pro Woche weniger spart etwa {x} pro Monat.',
  tipGood:'Super! Du bist im Budget. Weiter so 👏', tipNone:'Diese Woche keine Ausgaben erfasst. Tägliches Erfassen ist der Schlüssel.',
  back:'Zurück', week:'Woche', byCycle:'Nach Kategorie – aktueller Gehaltszyklus',
  general:'Allgemein', language:'Sprache', theme:'Design', themeAuto:'Automatisch', themeLight:'Hell', themeDark:'Dunkel',
  currency:'Währung', country:'Land & Währung', searchCountry:'Land oder Währung suchen...', salarySec:'Gehalt & Budget', salary:'Monatsgehalt', salaryDay:'Zahltag (Tag im Monat)', fixed:'Feste monatliche Kosten',
  fixedHint:'z. B. Miete, Raten. Werden automatisch abgezogen – nicht als Ausgabe erfassen.', addIncome:'+ Zusatzeinkommen', incomeAmount:'Betrag', incomeSource:'Quelle (z. B. Freelance)',
  incomeSaved:'Einkommen hinzugefügt', incomes:'Zusatzeinkommen in diesem Zyklus',
  notifSec:'Benachrichtigungen & Bericht', reportDay:'Tag des Wochenberichts', reminder:'Tägliche Erinnerung um', enableNotif:'Benachrichtigungen aktivieren',
  notifDenied:'Benachrichtigungen sind blockiert. Aktiviere sie in den Geräteeinstellungen.', notifUnsupported:'Nicht unterstützt. Auf dem iPhone die App zuerst zum Home-Bildschirm hinzufügen.',
  catsSec:'Kategorien', addCat:'+ Neue Kategorie', catName:'Name der Kategorie', emoji:'Symbol (Emoji)', color:'Farbe', catAdded:'Kategorie hinzugefügt',
  delCatQ:'Kategorie löschen? Ihre Ausgaben werden zu „Sonstiges" verschoben.',
  dataSec:'Daten & Datenschutz', privacy:'Beträge ausblenden', exportBtn:'Backup exportieren', importBtn:'Backup importieren',
  imported:'Daten importiert', importErr:'Ungültige Datei', importQ:'Alle aktuellen Daten werden durch das Backup ersetzt. Fortfahren?',
  wipe:'Alle Daten löschen', wipeQ:'Alle Daten werden dauerhaft von diesem Gerät gelöscht. Sicher?',
  privacyNote:'🔒 Keine Registrierung, kein Konto. Alles bleibt auf deinem Gerät und wird an keinen Server gesendet.',
  ob1Title:'Willkommen bei Masroufi', ob1Text:'Wisse mühelos, wohin dein Geld geht. Ohne Registrierung – deine Daten bleiben auf deinem Gerät.', chooseLang:'Sprache wählen',
  ob2Title:'Dein Gehalt', salaryQ:'Wie hoch ist dein Monatsgehalt?', salaryDayQ:'An welchem Tag im Monat kommt dein Gehalt?', fixedQ:'Feste monatliche Kosten (optional)',
  ob3Title:'Fertig!', reportDayQ:'An welchem Tag soll der Wochenbericht kommen?', dailyBudget:'Empfohlenes Tagesbudget', start:'Los geht\'s', next:'Weiter',
  salaryReq:'Gib dein Gehalt ein, damit wir dein Budget berechnen können',
  salaryArrived:'Ist dein Gehalt da? 💰', salaryChanged:'Bestätige den Betrag oder passe ihn an.', confirm:'Bestätigen', later:'Später', salaryConfirmed:'Neuer Gehaltszyklus gestartet 🎉',
  remindTitle:'Alle heutigen Ausgaben erfasst?', remindBody:'Jetzt in Sekunden nachtragen', reportTitle:'Dein Wochenbericht ist fertig 📊', reportBody:'Sieh dir an, wohin dein Geld diese Woche ging',
},
tr: {
  appName:'Masroufi', home:'Ana Sayfa', txns:'Harcamalar', reports:'Raporlar', settings:'Ayarlar',
  safeToday:'Bugün harcanabilir', ofDaily:'günlük {x} üzerinden', daysToSalary:'maaşa {n} gün kaldı',
  overToday:'Bugünkü limit aşıldı', remaining:'Maaştan kalan', spentOf:'{b} içinden {a} harcandı',
  onTrack:'✅ Yolundasın – bu hızla maaşın maaş gününe kadar yeter', runOut:'⚠️ Bu hızla paran {d} tarihinde biter',
  runOutNow:'⚠️ Bu dönemin bütçesi bitti', noSpendYet:'Ay sonu tahmini için harcamalarını gir',
  recent:'Son işlemler', seeAll:'Tümünü gör', empty:'Henüz harcama yok. + simgesine dokun ve ilkini saniyeler içinde ekle.',
  newReport:'📊 Haftalık raporun hazır', open:'Aç',
  backupTip:'Verilerin yalnızca bu cihazda. Telefon değiştirmeden önce Ayarlar\'dan yedek al.', gotIt:'Anladım',
  remindBanner:'Bugünkü tüm harcamalarını girdin mi?', addNow:'Şimdi ekle',
  addExpense:'Harcama ekle', editExpense:'Harcamayı düzenle', notePh:'Not veya mağaza (isteğe bağlı)',
  save:'Kaydet', delete:'Sil', cancel:'İptal', close:'Kapat', suggested:'✨ Öneri',
  saved:'Harcama kaydedildi', updated:'Güncellendi', deleted:'Silindi', undo:'Geri al', enterAmount:'Önce bir tutar gir',
  date:'Tarih', today:'Bugün', yesterday:'Dün',
  search:'Not veya kategori ara...', allCats:'Tüm kategoriler', thisCycle:'Maaş dönemi', thisMonth:'Bu ay', all:'Tümü',
  total:'Toplam', noResults:'Sonuç yok', count:'{n} işlem',
  weekly:'Haftalık rapor', thisWeek:'Bu hafta (canlı)', history:'Rapor geçmişi', noHistory:'İlk haftalık raporun {d} günü gelecek.',
  totalSpent:'Toplam harcama', vsLast:'geçen haftaya göre', same:'Geçen haftayla aynı', noPrev:'Karşılaştırılacak önceki hafta yok',
  whereSpent:'Paran nereye gitti', topExpenses:'En büyük 3 harcama', topDay:'En çok harcadığın gün {d} oldu', budgetStatus:'Bütçe durumu',
  budgetLine:'Maaşının %{p}\'ini harcadın, {n} gün kaldı', tip:'💡 Haftanın ipucu', nothing:'Bu dönemde harcama yok',
  tipCat:'{c} harcaman ortalamanın %{p} üzerinde. Normale dönersen ayda yaklaşık {x} tasarruf edersin.',
  tipPace:'Maaşının %{p}\'ini harcadın ama dönemin yalnızca %{e}\'i geçti. Günde {x} altında kalmaya çalış.',
  tipShare:'{c}, bu haftaki harcamanın %{p}\'i. Haftada iki kez azaltırsan ayda yaklaşık {x} tasarruf edersin.',
  tipGood:'Harika! Bütçe içindesin. Böyle devam 👏', tipNone:'Bu hafta harcama girilmedi. Günlük kayıt farkındalığın anahtarı.',
  back:'Geri', week:'Hafta', byCycle:'Kategoriye göre – mevcut maaş dönemi',
  general:'Genel', language:'Dil', theme:'Tema', themeAuto:'Otomatik', themeLight:'Açık', themeDark:'Koyu',
  currency:'Para birimi', country:'Ülke ve para birimi', searchCountry:'Ülke veya para birimi ara...', salarySec:'Maaş ve bütçe', salary:'Aylık maaş', salaryDay:'Maaş günü (ayın günü)', fixed:'Sabit aylık giderler',
  fixedHint:'ör. kira, taksitler. Otomatik düşülür – harcama olarak girme.', addIncome:'+ Ek gelir ekle', incomeAmount:'Tutar', incomeSource:'Kaynak (ör. serbest çalışma)',
  incomeSaved:'Gelir eklendi', incomes:'Bu dönemki ek gelir',
  notifSec:'Bildirimler ve rapor', reportDay:'Haftalık rapor günü', reminder:'Günlük hatırlatma saati', enableNotif:'Bildirimleri aç',
  notifDenied:'Bildirimler engellendi. Cihaz ayarlarından aç.', notifUnsupported:'Desteklenmiyor. iPhone\'da önce uygulamayı Ana Ekrana ekle.',
  catsSec:'Kategoriler', addCat:'+ Yeni kategori', catName:'Kategori adı', emoji:'Simge (emoji)', color:'Renk', catAdded:'Kategori eklendi',
  delCatQ:'Kategori silinsin mi? Harcamaları "Diğer"e taşınır.',
  dataSec:'Veri ve gizlilik', privacy:'Tutarları gizle', exportBtn:'Yedeği dışa aktar', importBtn:'Yedeği içe aktar',
  imported:'Veriler içe aktarıldı', importErr:'Geçersiz dosya', importQ:'Mevcut tüm veriler yedekle değiştirilecek. Devam edilsin mi?',
  wipe:'Tüm verileri sil', wipeQ:'Tüm verilerin bu cihazdan kalıcı olarak silinecek. Emin misin?',
  privacyNote:'🔒 Kayıt yok, hesap yok. Her şey cihazında kalır ve hiçbir sunucuya gönderilmez.',
  ob1Title:'Masroufi\'ye hoş geldin', ob1Text:'Paranın nereye gittiğini zahmetsizce öğren. Kayıt yok, verilerin cihazında kalır.', chooseLang:'Dil seç',
  ob2Title:'Maaşın', salaryQ:'Aylık maaşın ne kadar?', salaryDayQ:'Maaşın ayın hangi günü yatıyor?', fixedQ:'Sabit aylık giderler (isteğe bağlı)',
  ob3Title:'Hazırız!', reportDayQ:'Haftalık rapor hangi gün gelsin?', dailyBudget:'Önerilen günlük bütçe', start:'Başla', next:'İleri',
  salaryReq:'Bütçeni hesaplamak için maaşını gir',
  salaryArrived:'Maaşın yattı mı? 💰', salaryChanged:'Tutarı onayla veya değiştiyse düzenle.', confirm:'Onayla', later:'Sonra', salaryConfirmed:'Yeni maaş dönemi başladı 🎉',
  remindTitle:'Bugünkü tüm harcamalarını girdin mi?', remindBody:'Şimdi saniyeler içinde ekle', reportTitle:'Haftalık raporun hazır 📊', reportBody:'Bu hafta paranın nereye gittiğini gör',
}};

const MULTI = {
ar:{ accounts:'حساباتي', accountsQ:'حساباتك ودخل كل حساب شهرياً', accountsHint:'أضف حساباً لكل عملة تستخدمها. الدخل يمكن أن يكون صفراً.', addAccount:'+ إضافة حساب بعملة أخرى', monthlyIncome:'الدخل الشهري',
  homeCur:'العملة المحلية (للحساب الإجمالي)', totalApprox:'الإجمالي التقريبي', accNeg:'⚠️ حساب {a} بالسالب، ومغطّى من حساباتك الأخرى', totalNeg:'🚨 مجموع حساباتك بالسالب',
  ratesSec:'أسعار الصرف', ratesInfo:'أسعار تقريبية (السعر الوسطي) من {src} · آخر تحديث {d}', ratesNone:'لم تُحمَّل أسعار الصرف بعد، يلزم اتصال إنترنت', refreshRates:'تحديث الأسعار', ratesOk:'تم تحديث الأسعار', ratesFail:'تعذّر التحديث، تُستخدم آخر أسعار محفوظة',
  manualRate:'سعر يدوي (اختياري)، مثلاً سعر السوق الفعلي. اتركه فارغاً لاستخدام السعر التلقائي.', noRate:'⚠️ لا يوجد سعر صرف لـ {c}، أدخله يدوياً من الإعدادات', account:'الحساب', accDelBlocked:'لا يمكن حذف حساب عليه مصروفات أو دخل، أو الحساب الوحيد', accExists:'يوجد حساب بهذه العملة', incomeReq:'أدخل دخلاً لحساب واحد على الأقل', auto:'تلقائي' },
en:{ accounts:'My accounts', accountsQ:'Your accounts and the monthly income of each', accountsHint:'Add one account per currency you use. Income can be zero.', addAccount:'+ Add account in another currency', monthlyIncome:'Monthly income',
  homeCur:'Home currency (for the total)', totalApprox:'Approximate total', accNeg:'⚠️ {a} account is negative, covered by your other accounts', totalNeg:'🚨 Your total balance is negative',
  ratesSec:'Exchange rates', ratesInfo:'Approximate mid-market rates from {src} · updated {d}', ratesNone:'Exchange rates not loaded yet — internet needed', refreshRates:'Refresh rates', ratesOk:'Rates updated', ratesFail:'Update failed — using last saved rates',
  manualRate:'Manual rate (optional), e.g. the real market rate. Leave empty to use the automatic rate.', noRate:'⚠️ No exchange rate for {c} — enter it manually in Settings', account:'Account', accDelBlocked:'Can\'t delete an account with expenses/income, or the only account', accExists:'An account in this currency already exists', incomeReq:'Enter income for at least one account', auto:'auto' },
de:{ accounts:'Meine Konten', accountsQ:'Deine Konten und das Monatseinkommen je Konto', accountsHint:'Ein Konto pro Währung, die du nutzt. Einkommen darf 0 sein.', addAccount:'+ Konto in anderer Währung', monthlyIncome:'Monatseinkommen',
  homeCur:'Hauptwährung (für die Summe)', totalApprox:'Ungefähre Summe', accNeg:'⚠️ Konto {a} ist im Minus, gedeckt durch deine anderen Konten', totalNeg:'🚨 Dein Gesamtsaldo ist negativ',
  ratesSec:'Wechselkurse', ratesInfo:'Ungefähre Mittelkurse von {src} · Stand {d}', ratesNone:'Kurse noch nicht geladen – Internet nötig', refreshRates:'Kurse aktualisieren', ratesOk:'Kurse aktualisiert', ratesFail:'Aktualisierung fehlgeschlagen – letzte Kurse werden genutzt',
  manualRate:'Manueller Kurs (optional), z. B. der echte Marktkurs. Leer lassen für automatischen Kurs.', noRate:'⚠️ Kein Wechselkurs für {c} – bitte in den Einstellungen manuell eingeben', account:'Konto', accDelBlocked:'Konto mit Buchungen oder einziges Konto kann nicht gelöscht werden', accExists:'Ein Konto in dieser Währung existiert bereits', incomeReq:'Gib für mindestens ein Konto ein Einkommen ein', auto:'auto' },
tr:{ accounts:'Hesaplarım', accountsQ:'Hesapların ve her birinin aylık geliri', accountsHint:'Kullandığın her para birimi için bir hesap ekle. Gelir sıfır olabilir.', addAccount:'+ Başka para biriminde hesap ekle', monthlyIncome:'Aylık gelir',
  homeCur:'Ana para birimi (toplam için)', totalApprox:'Yaklaşık toplam', accNeg:'⚠️ {a} hesabı ekside, diğer hesapların karşılıyor', totalNeg:'🚨 Toplam bakiyen ekside',
  ratesSec:'Döviz kurları', ratesInfo:'{src} kaynaklı yaklaşık orta kurlar · güncelleme {d}', ratesNone:'Kurlar henüz yüklenmedi — internet gerekli', refreshRates:'Kurları güncelle', ratesOk:'Kurlar güncellendi', ratesFail:'Güncellenemedi — son kayıtlı kurlar kullanılıyor',
  manualRate:'Manuel kur (isteğe bağlı), ör. gerçek piyasa kuru. Otomatik kur için boş bırak.', noRate:'⚠️ {c} için kur yok — Ayarlar\'dan elle gir', account:'Hesap', accDelBlocked:'Harcaması/geliri olan veya tek hesap silinemez', accExists:'Bu para biriminde zaten bir hesap var', incomeReq:'En az bir hesap için gelir gir', auto:'otomatik' },
};
for (const l in MULTI) Object.assign(S[l], MULTI[l]);
const t = (k, v = {}) => (S[st().settings.lang][k] ?? S.en[k] ?? k).replace(/\{(\w+)\}/g, (_, n) => v[n] ?? '');

/* --------------------------------------------------------------- categories & keywords */
const DEFAULT_CATS = [
  { id:'food',      ar:'طعام',     en:'Food', de:'Essen', tr:'Yemek',          icon:'🍽️', color:'#f59e0b' },
  { id:'transport', ar:'مواصلات',  en:'Transport', de:'Verkehr', tr:'Ulaşım',     icon:'🚗', color:'#3b82f6' },
  { id:'bills',     ar:'فواتير',   en:'Bills', de:'Rechnungen', tr:'Faturalar',         icon:'🧾', color:'#8b5cf6' },
  { id:'shopping',  ar:'تسوق',     en:'Shopping', de:'Einkaufen', tr:'Alışveriş',      icon:'🛍️', color:'#ec4899' },
  { id:'health',    ar:'صحة',      en:'Health', de:'Gesundheit', tr:'Sağlık',        icon:'💊', color:'#10b981' },
  { id:'fun',       ar:'ترفيه',    en:'Entertainment', de:'Freizeit', tr:'Eğlence', icon:'🎬', color:'#ef4444' },
  { id:'education', ar:'تعليم',    en:'Education', de:'Bildung', tr:'Eğitim',     icon:'📚', color:'#06b6d4' },
  { id:'other',     ar:'أخرى',     en:'Other', de:'Sonstiges', tr:'Diğer',         icon:'📦', color:'#6b7280' },
];
const KEYWORDS = {
  food: 'قهوة قهوه كافيه كوفي كافي مطعم مطاعم غدا غداء عشا عشاء فطور فطوره شاورما برجر بيتزا سندويش ساندويتش ستاربكس هرفي البيك كودو ماكدونالدز ماك كنتاكي جاهز هنقرستيشن هنقر مرسول تويو دانكن باسكن حلا حلى حلويات كيك عصير شاي بقالة بقاله سوبرماركت تموينات الدانوب بنده كارفور العثيم التميمي لولو خضار فواكه لحم دجاج رز خبز مخبز تمر تمور ماء_شرب كرك مندي كبسة كبسه مشويات ايسكريم آيسكريم طلبات starbucks albaik mcdonalds kfc jahez hungerstation mrsool talabat dunkin coffee cafe restaurant lunch dinner breakfast grocery groceries food pizza burger tea juice bakery panda danube carrefour othaim tamimi lulu kaffee bäckerei bäcker mittagessen abendessen frühstück essen rewe edeka aldi lidl netto kaufland penny lieferando döner imbiss supermarkt getränke kahve kafe restoran yemek kahvaltı öğle akşam market migros bim şok a101 fırın simit döner pide çay',
  transport: 'بنزين وقود بترول محطة محطه ساسكو الدريس ارامكو أرامكو اوبر أوبر كريم تاكسي مشوار مشاوير باص مترو قطار سار موقف مواقف باركنج غسيل زيت صيانة صيانه كفرات تذكرة تذكره طيران رحلة_طيران سيارة سياره ورشة ورشه تأمين_سيارة نقل fuel gas petrol uber careem taxi bus metro train parking flight car carwash sasco aldrees aramco tanken tankstelle benzin diesel bahn db ticket deutschlandticket parken taxi werkstatt benzin akaryakıt otobüs metro taksi otopark bilet uçak',
  bills: 'فاتورة فاتوره فواتير كهربا كهرباء الكهرباء مويه ماء_بيت انترنت إنترنت نت جوال باقة باقه شحن_رصيد stc موبايلي زين سوا ايجار إيجار اشتراك قسط اقساط أقساط تابي تمارا سداد غاز_بيت rent electricity water internet bill bills phone mobily zain installment tabby tamara subscription miete strom handy internet rundfunk gez versicherung rate abo kira elektrik su doğalgaz fatura internet telefon abonelik taksit',
  shopping: 'نون امازون أمازون شي شيين ملابس ثوب ثياب عباية عبايه جزمة جزمه حذاء جوتي عطر عطور ساعة ساعه هدية هديه هدايا اكسسوارات ايكيا سنتربوينت زارا اكسترا جرير مول سوق تسوق شنطة شنطه نظارة نظاره noon amazon shein ikea zara extra jarir mall clothes shoes perfume gift shopping kleidung schuhe dm rossmann ikea mediamarkt saturn zalando geschenk giyim ayakkabı trendyol hepsiburada mağaza hediye',
  health: 'صيدلية صيدليه دوا دواء علاج مستشفى مستشفي عيادة عياده دكتور طبيب أسنان اسنان تحاليل تحليل النهدي فيتامين فيتامينات نادي جيم كشف نظاره_طبية pharmacy doctor hospital clinic medicine dentist gym nahdi vitamins apotheke arzt zahnarzt fitnessstudio medikamente eczane doktor hastane ilaç diş spor',
  fun: 'سينما فيلم افلام نتفلكس نتفليكس شاهد سبوتيفاي العاب ألعاب لعبة لعبه بلايستيشن بلاستيشن حفلة حفله ملاهي رحلة رحله سفر فندق شاليه شاليهات استراحة استراحه بولينج كورة كوره تذاكر_مباراة مباراة cinema movie netflix shahid spotify game games playstation ps5 concert hotel travel trip bowling kino konzert spiel urlaub reise sinema konser oyun tatil otel',
  education: 'مدرسة مدرسه مدارس جامعة جامعه رسوم_دراسية دورة دوره كورس دروس مدرس خصوصي كتاب كتب دفاتر قرطاسية قرطاسيه روضة روضه حضانة حضانه course school tuition books udemy coursera university kindergarten schule kurs bücher buch uni studium kita okul kurs kitap üniversite dershane',
};
const STOP = new Set(['حق','على','في','من','مع','الى','الي','عن','و','ب','ل','صرفت','دفعت','شريت','اشتريت','ريال','ريالات','درهم','رس','the','for','at','on','of','to','a','an','and','sar','aed','paid','bought']);

function norm(s) {
  return String(s || '').toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
}
function tokens(s) {
  return norm(s).split(/[^a-z0-9\u00C0-\u024F\u0621-\u064A&]+/).filter(x => x.length >= 2 && !STOP.has(x));
}
function variants(tok) {
  const v = new Set([tok]);
  for (const p of ['وال', 'بال', 'فال', 'كال']) if (tok.startsWith(p) && tok.length > p.length + 1) v.add(tok.slice(p.length));
  if (tok.startsWith('لل') && tok.length > 3) v.add(tok.slice(2));
  if (tok.startsWith('ال') && tok.length > 3) v.add(tok.slice(2));
  if (/^[وبلف]/.test(tok) && tok.length > 4) { const r = tok.slice(1); v.add(r); if (r.startsWith('ال') && r.length > 3) v.add(r.slice(2)); }
  return [...v];
}
const KW_INDEX = {};
const KW_PHRASES = [];
for (const [cat, list] of Object.entries(KEYWORDS)) {
  for (const raw of list.split(/\s+/)) {
    const k = norm(raw);
    if (k.includes('_')) KW_PHRASES.push([k.replace(/_/g, ' '), cat]);
    else { KW_INDEX[k] = KW_INDEX[k] || cat; for (const vv of variants(k)) KW_INDEX[vv] = KW_INDEX[vv] || cat; }
  }
}
function suggestCategory(text) {
  const n = norm(text).trim();
  if (!n) return null;
  const score = {};
  const add = (c, w) => { if (catById(c)) score[c] = (score[c] || 0) + w; };
  for (const tok of tokens(text)) {
    for (const v of variants(tok)) {
      const L = st().learned[v];
      if (L) for (const [c, cnt] of Object.entries(L)) add(c, 2 * cnt);
      if (KW_INDEX[v]) add(KW_INDEX[v], 1);
    }
  }
  for (const [ph, c] of KW_PHRASES) if (n.includes(ph)) add(c, 1);
  let best = null, bs = 0;
  for (const [c, s] of Object.entries(score)) if (s > bs) { bs = s; best = c; }
  return best;
}
function learn(text, catId) {
  const L = st().learned;
  for (const tok of tokens(text)) {
    const keys = variants(tok);
    const base = keys[keys.length - 1];
    L[base] = L[base] || {};
    for (const c of Object.keys(L[base])) if (c !== catId) L[base][c] = Math.max(0, L[base][c] - 1);
    L[base][catId] = (L[base][catId] || 0) + 1;
  }
}

/* --------------------------------------------------------------- state */
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; };
const dayDiff = (a, b) => Math.round((parse(ymd(b)) - parse(ymd(a))) / 864e5);
const now = () => (window.__NOW__ ? new Date(window.__NOW__) : new Date()); // __NOW__ = test hook
const todayStr = () => ymd(now());
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const sum = a => a.reduce((s, e) => s + e.amount, 0);

function defaultState() {
  return {
    v: 1,
    settings: { lang:'ar', country:'SA', currency:'SAR', salary:0, salaryDay:27, fixed:0, reportDay:5, reminderHour:21, theme:'auto',
                privacy:false, onboarded:false, notif:false, backupTipDismissed:false, installedAt:todayStr() },
    device_id: uid(),
    categories: DEFAULT_CATS.map(c => ({ ...c, custom:false })),
    expenses: [], incomes: [], learned: {}, reports: [], cycleSalary: {},
    accounts: [], rates: { r:{}, ts:0, src:'' }, rateManual: {},
    meta: { lastRemind:'', salaryAskSkipped:'' },
  };
}
function migrate(s) {
  const d = defaultState();
  s.settings = { ...d.settings, ...(s.settings || {}) };
  s.meta = { ...d.meta, ...(s.meta || {}) };
  if (!s.settings.country) s.settings.country = s.settings.currency === 'AED' ? 'AE' : 'SA';
  for (const k of ['categories', 'expenses', 'incomes', 'reports']) if (!Array.isArray(s[k])) s[k] = d[k];
  if (!s.categories.length) s.categories = d.categories;
  s.learned = s.learned || {}; s.cycleSalary = s.cycleSalary || {}; s.device_id = s.device_id || d.device_id;
  s.rates = s.rates || d.rates; s.rateManual = s.rateManual || {};
  if (!Array.isArray(s.accounts) || !s.accounts.length) s.accounts = s.settings.onboarded ? [{ id:'main', cc:s.settings.country, currency:s.settings.currency, income:+s.settings.salary || 0 }] : [];
  const a0 = s.accounts[0] && s.accounts[0].id;
  if (a0) { for (const e of s.expenses) if (!e.accountId) e.accountId = a0; for (const i of s.incomes) if (!i.accountId) i.accountId = a0; }
  for (const k of Object.keys(s.cycleSalary)) if (typeof s.cycleSalary[k] === 'number') s.cycleSalary[k] = a0 ? { [a0]: s.cycleSalary[k] } : {};
  return s;
}
let STATE;
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v) return migrate(s); } catch (e) {}
  return defaultState();
}
function st() { return STATE; }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(STATE)); } catch (e) { toast('⚠️ Storage error'); } }

const catById = id => st().categories.find(c => c.id === id);
const catName = c => c ? (c[st().settings.lang] || c.en || c.ar) : '';
function catUsage() {
  const u = {}; for (const e of st().expenses) u[e.categoryId] = (u[e.categoryId] || 0) + 1; return u;
}
function sortedCats() {
  const u = catUsage(); const cats = st().categories;
  return [...cats].sort((a, b) => (u[b.id] || 0) - (u[a.id] || 0) || cats.indexOf(a) - cats.indexOf(b));
}

/* --------------------------------------------------------------- formatting */
const isAr = () => st().settings.lang === 'ar';
const LOCALES = { ar:'ar-SA-u-ca-gregory-nu-latn', en:'en-GB', de:'de-DE', tr:'tr-TR' };
const loc = () => LOCALES[st().settings.lang] || 'en-GB';
const AR_SYM = { SAR:'ر.س', AED:'د.إ', KWD:'د.ك', QAR:'ر.ق', BHD:'د.ب', OMR:'ر.ع', JOD:'د.أ', EGP:'ج.م', IQD:'د.ع', MAD:'د.م', TND:'د.ت', DZD:'د.ج', LYD:'د.ل', SYP:'ل.س', LBP:'ل.ل', YER:'ر.ي', SDG:'ج.س' };
function curLabel(c = st().settings.currency) {
  if (isAr() && AR_SYM[c]) return AR_SYM[c];
  try { const sym = new Intl.NumberFormat(loc(), { style:'currency', currency:c, currencyDisplay:'narrowSymbol' }).formatToParts(0).find(x => x.type === 'currency').value; return /^[A-Z]{3}$/.test(sym) ? c : sym; } catch (e) { return c; }
}
const COUNTRIES = window.MASROUFI_COUNTRIES || [{ code:'SA', currency:'SAR' }];
const flag = cc => `<img class="flg" src="https://flagcdn.com/w80/${cc.toLowerCase()}.png" alt="${cc}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('b'),{className:'flg flgtxt',textContent:this.alt}))">`;
function dn(type, code) { try { return new Intl.DisplayNames([st().settings.lang], { type }).of(code) || code; } catch (e) { return code; } }
function countryList() {
  const L = COUNTRIES.map(c => ({ ...c, name: dn('region', c.code), curName: dn('currency', c.currency) }));
  const coll = new Intl.Collator(st().settings.lang);
  return L.sort((a, b) => coll.compare(a.name, b.name));
}
function countryLabel(code, cur) { return `${flag(code)}<span class="grow">${esc(dn('region', code))} · ${cur}</span>`; }
// Country picker: searchable, scrollable bottom sheet
function openCountryPicker(current, onPick) {
  const sh = openSheet(`<div class="row between"><b>${t('country')}</b><button class="link" id="cpX">${t('close')}</button></div>
    <input id="cpQ" type="search" placeholder="${t('searchCountry')}" style="margin:10px 0" autocomplete="off">
    <div id="cpList" class="cplist"></div>`);
  const all = countryList();
  const draw = q => {
    const n = norm(q.trim());
    const list = n ? all.filter(c => norm(c.name).includes(n) || c.code.toLowerCase().includes(n) || c.currency.toLowerCase().includes(n) || norm(c.curName).includes(n)) : all;
    $('#cpList', sh).innerHTML = list.length ? list.map(c => `<button class="cprow ${c.code === current ? 'on' : ''}" data-cc="${c.code}" data-cur="${c.currency}">
      <span class="fl">${flag(c.code)}</span><span class="grow"><div class="t1">${esc(c.name)}</div><div class="t2">${esc(c.curName)}</div></span><b dir="ltr">${c.currency}</b></button>`).join('')
      : `<div class="empty">${t('noResults')}</div>`;
    sh.querySelectorAll('[data-cc]').forEach(b => (b.onclick = () => { closeSheet(); onPick(b.dataset.cc, b.dataset.cur); }));
  };
  draw('');
  $('#cpQ', sh).oninput = e => draw(e.target.value);
  $('#cpX', sh).onclick = closeSheet;
  const on = $('.cprow.on', sh); if (on) on.scrollIntoView({ block:'center' });
}
function num(n) { const v = Math.round(n * 100) / 100; return v.toLocaleString('en-US', { maximumFractionDigits: Number.isInteger(v) ? 0 : 2 }); }
function money(n, cur) { return `<span class="amt"><bdi dir="ltr">${n < 0 ? '-' : ''}${num(Math.abs(n))}</bdi> ${curLabel(cur)}</span>`; }
function moneyTxt(n, cur) { return `${num(n)} ${curLabel(cur)}`; }
/* ---- accounts & currency conversion (all via USD) */
const home = () => st().settings.currency;
const accById = id => st().accounts.find(a => a.id === id) || st().accounts[0];
const accCur = id => (accById(id) || { currency: home() }).currency;
const expCur = e => accCur(e.accountId);
const missingRates = new Set();
function perUSD(c) { if (c === 'USD') return 1; const m = +st().rateManual[c]; return m > 0 ? m : st().rates.r[c]; }
function cv(a, from, to = home()) {
  if (from === to || !a) return a || 0;
  const f = perUSD(from), g = perUSD(to);
  if (!f || !g) { missingRates.add(f ? to : from); return 0; }
  return (a / f) * g;
}
const valH = e => cv(e.amount, expCur(e));
const sumH = list => list.reduce((x, e) => x + valH(e), 0);
const sumInc = list => list.reduce((x, i) => x + cv(i.amount, accCur(i.accountId)), 0);
const neededCurs = () => [...new Set([home(), ...st().accounts.map(a => a.currency)])];
let ratesBusy = null;
async function fetchRates(force) {
  const R0 = st().rates, need = neededCurs();
  const fresh = Date.now() - R0.ts < 6 * 3600e3 && need.every(c => c === 'USD' || R0.r[c]);
  if (!force && fresh) return false;
  if (ratesBusy) return ratesBusy;
  ratesBusy = (async () => {
    let r = {}; const src = [];
    try { const j = await (await fetch('https://open.er-api.com/v6/latest/USD', { cache:'no-store' })).json(); if (j && j.rates) { r = { ...j.rates }; src.push('ExchangeRate-API'); } } catch (e) {}
    if (!src.length || need.some(c => c !== 'USD' && !r[c])) {
      try {
        const j = await (await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', { cache:'no-store' })).json();
        let added = false;
        for (const [k, v] of Object.entries(j.usd || {})) { const K = k.toUpperCase(); if (/^[A-Z]{3}$/.test(K) && !r[K] && v > 0) { r[K] = v; added = true; } }
        if (added) src.push('fawazahmed0/currency-api');
      } catch (e) {}
    }
    ratesBusy = null;
    if (!src.length) return null;
    st().rates = { r: { ...R0.r, ...r, USD: 1 }, ts: Date.now(), src: src.join(' + ') }; missingRates.clear(); persist(); return true;
  })();
  return ratesBusy;
}
function refreshRatesUI(force) { fetchRates(force).then(ok => { if (force) toast(ok ? t('ratesOk') : t('ratesFail')); if (ok && !overlay.classList.contains('show')) render(); }); }
const accLabel = a => `${flag(a.cc)}<span class="grow"><b dir="ltr">${a.currency}</b> <span class="muted">${esc(dn('currency', a.currency))}</span></span>`;
const fmtDate = (d, o) => new Intl.DateTimeFormat(loc(), o).format(d);
function hijri(d) {
  try { return new Intl.DateTimeFormat(isAr() ? 'ar-SA-u-ca-islamic-umalqura-nu-latn' : st().settings.lang + '-u-ca-islamic-umalqura', { day:'numeric', month:'long', year:'numeric' }).format(d); }
  catch (e) { return ''; }
}
const weekdayName = i => fmtDate(new Date(2026, 0, 4 + i), { weekday:'long' }); // 4 Jan 2026 = Sunday
function relDay(s) {
  const td = todayStr(); if (s === td) return t('today'); if (s === ymd(addDays(now(), -1))) return t('yesterday');
  return fmtDate(parse(s), { weekday:'short', day:'numeric', month:'short' });
}

/* --------------------------------------------------------------- money engine */
const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
function payday(y, m) { const d = new Date(y, m, 1); y = d.getFullYear(); m = d.getMonth(); return new Date(y, m, Math.min(st().settings.salaryDay, daysInMonth(y, m))); }
function cycleFor(date) {
  const d = parse(ymd(date)); const p = payday(d.getFullYear(), d.getMonth());
  const start = d >= p ? p : payday(d.getFullYear(), d.getMonth() - 1);
  const end = payday(start.getFullYear(), start.getMonth() + 1); // exclusive (next payday)
  return { start, end, key: ymd(start) };
}
const between = (list, a, b) => list.filter(e => e.date >= a && e.date < b); // [a,b)
function cycleStats(ref = now()) {
  const s = st(); const c = cycleFor(ref); const sK = ymd(c.start), eK = ymd(c.end), r = ymd(ref), rNext = ymd(addDays(ref, 1));
  const cyc = s.cycleSalary[c.key] || {};
  const accs = s.accounts.map(a => {
    const base = +(cyc[a.id] ?? a.income) || 0;
    const extra = sum(s.incomes.filter(i => i.accountId === a.id && i.date >= sK && i.date < eK));
    const spentA = sum(s.expenses.filter(e => e.accountId === a.id && e.date >= sK && e.date < rNext));
    const balance = base + extra - spentA;
    return { ...a, base, extra, spent: spentA, balance, balanceHome: cv(balance, a.currency) };
  });
  const salary = accs.reduce((x, a) => x + cv(a.base, a.currency), 0);
  const extraList = between(s.incomes, sK, eK);
  const income = salary + sumInc(extraList);
  const fixed = +s.settings.fixed || 0;
  const spent = sumH(between(s.expenses, sK, rNext));
  const todaySpent = sumH(s.expenses.filter(e => e.date === r));
  const remaining = income - fixed - spent;
  const daysLeft = Math.max(1, dayDiff(ref, c.end));
  const totalDays = Math.max(1, dayDiff(c.start, c.end));
  const elapsed = Math.min(totalDays, dayDiff(c.start, ref) + 1);
  const daily = Math.max(0, remaining + todaySpent) / daysLeft;
  const safeToday = daily - todaySpent;
  const avg = spent / elapsed;
  let runOut = null, onTrack = null;
  if (spent > 0 && elapsed >= 2) {
    if (remaining <= 0) runOut = 'now';
    else { const d = remaining / avg; if (d < daysLeft - 1) runOut = addDays(ref, Math.floor(d)); else onTrack = true; }
  }
  const usedPct = income > 0 ? Math.round(((spent + fixed) / income) * 100) : 0;
  const varPct = income - fixed > 0 ? Math.round((spent / (income - fixed)) * 100) : (spent > 0 ? 100 : 0);
  const elapsedPct = Math.round((elapsed / totalDays) * 100);
  return { ...c, accs, salary, income, extraList, fixed, spent, todaySpent, remaining, daysLeft, totalDays, elapsed, daily, safeToday, runOut, onTrack, usedPct, varPct, elapsedPct };
}
const paceCls = cs => (cs.varPct > cs.elapsedPct + 10 ? 'bad' : cs.varPct > cs.elapsedPct ? 'warn' : '');

/* --------------------------------------------------------------- weekly report */
function weekStartOf(d) { const x = parse(ymd(d)); return addDays(x, -((x.getDay() - st().settings.reportDay + 7) % 7)); }
function catTotals(list) {
  const m = {}; for (const e of list) m[e.categoryId] = (m[e.categoryId] || 0) + valH(e);
  return Object.entries(m).map(([id, amount]) => ({ id, amount, cat: catById(id) || catById('other') })).sort((a, b) => b.amount - a.amount);
}
function buildReport(ws) {
  const s = st(); const a = ymd(ws), b = ymd(addDays(ws, 7));
  const list = between(s.expenses, a, b);
  const total = sumH(list);
  const prevTotal = sumH(between(s.expenses, ymd(addDays(ws, -7)), a));
  const cats = catTotals(list);
  const top = [...list].sort((x, y) => valH(y) - valH(x)).slice(0, 3);
  const days = {}; for (const e of list) days[e.date] = (days[e.date] || 0) + valH(e);
  const topDayKey = Object.keys(days).sort((x, y) => days[y] - days[x])[0];
  const lastDay = addDays(ws, 6); const ref = lastDay < now() ? lastDay : now();
  const cs = cycleStats(ref);
  const change = prevTotal > 0 ? Math.round(((total - prevTotal) / prevTotal) * 100) : null;
  const daysAfter = ymd(ref) === todayStr() ? cs.daysLeft : Math.max(0, cs.daysLeft - 1);
  return { ws, weekStart:a, end:lastDay, daysAfter, list, total, prevTotal, change, cats, top, topDay: topDayKey ? parse(topDayKey) : null, cs, tip: makeTip(ws, list, total, cats, cs) };
}
function makeTip(ws, list, total, cats, cs) {
  if (!list.length) return t('tipNone');
  const prev = {}; let weeksWithData = 0;
  for (let i = 1; i <= 3; i++) {
    const l = between(st().expenses, ymd(addDays(ws, -7 * i)), ymd(addDays(ws, -7 * (i - 1))));
    if (l.length) weeksWithData++;
    for (const e of l) prev[e.categoryId] = (prev[e.categoryId] || 0) + valH(e);
  }
  if (weeksWithData) {
    let best = null;
    for (const c of cats) {
      const avg = (prev[c.id] || 0) / weeksWithData;
      if (avg > 0) { const diff = c.amount - avg, pct = Math.round((diff / avg) * 100); if (pct >= 20 && diff >= 20 && (!best || diff > best.diff)) best = { c, diff, pct }; }
    }
    if (best) return t('tipCat', { c: catName(best.c.cat), p: best.pct, x: moneyTxt(Math.round((best.diff * 52) / 12 / 10) * 10 || Math.round(best.diff * 4.3)) });
  }
  if (cs.income > 0 && cs.varPct > cs.elapsedPct + 10) return t('tipPace', { p: cs.usedPct, e: cs.elapsedPct, x: moneyTxt(Math.floor(cs.daily)) });
  const topc = cats[0];
  if (topc && cats.length > 1 && topc.amount / total >= 0.4) {
    const n = list.filter(e => e.categoryId === topc.id).length;
    return t('tipShare', { c: catName(topc.cat), p: Math.round((topc.amount / total) * 100), x: moneyTxt(Math.round((topc.amount / n) * 2 * 4.3)) });
  }
  return t('tipGood');
}
function generateReports() {
  const s = st(); const cur = weekStartOf(now());
  const firstDates = [s.settings.installedAt, ...s.expenses.map(e => e.date)].sort();
  let ws = weekStartOf(parse(firstDates[0]));
  const minWs = addDays(cur, -7 * 26); if (ws < minWs) ws = weekStartOf(minWs);
  const have = new Set(s.reports.map(r => r.weekStart)); let created = 0;
  while (ws < cur) {
    const k = ymd(ws);
    if (!have.has(k)) {
      const r = buildReport(ws);
      s.reports.push({ id: uid(), weekStart: k, total_spent: r.total,
        top_categories: r.cats.slice(0, 3).map(c => ({ id: c.id, amount: c.amount })), insight_text: r.tip,
        generatedAt: new Date().toISOString(), seen: false, notified: false });
      created++;
    }
    ws = addDays(ws, 7);
  }
  s.reports.sort((a, b) => b.weekStart.localeCompare(a.weekStart));
  s.reports = s.reports.slice(0, 52);
  if (created) persist();
  return created;
}

/* --------------------------------------------------------------- notifications */
async function notify(title, body) {
  if (!st().settings.notif || !('Notification' in window) || Notification.permission !== 'granted') return false;
  try { const reg = await navigator.serviceWorker?.getRegistration(); if (reg) { await reg.showNotification(title, { body, icon:'icons/icon-192.png', badge:'icons/icon-192.png', tag:title, dir: isAr() ? 'rtl' : 'ltr', lang: st().settings.lang }); return true; } } catch (e) {}
  try { new Notification(title, { body }); return true; } catch (e) { return false; }
}
function checkTimedEvents() {
  const s = st(); if (!s.settings.onboarded) return;
  generateReports();
  const fresh = s.reports.find(r => !r.notified);
  if (fresh) { s.reports.forEach(r => (r.notified = true)); persist(); notify(t('reportTitle'), t('reportBody')); }
  const n = now(), td = todayStr();
  if (n.getHours() >= s.settings.reminderHour && s.meta.lastRemind !== td) {
    s.meta.lastRemind = td; persist();
    if (!s.expenses.some(e => e.date === td)) notify(t('remindTitle'), t('remindBody'));
  }
}

/* --------------------------------------------------------------- UI plumbing */
const $ = (q, el = document) => el.querySelector(q);
const app = $('#app'), overlay = $('#overlay'), toastEl = $('#toast'), fab = $('#fab'), tabs = $('#tabs');
let view = 'home', viewArg = null;
const txFilter = { q:'', cat:'', period:'cycle' };
let toastTimer = null;

function applyChrome() {
  const s = st().settings;
  document.documentElement.lang = s.lang; document.documentElement.dir = isAr() ? 'rtl' : 'ltr';
  const dark = s.theme === 'dark' || (s.theme === 'auto' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.body.classList.toggle('privacy', !!s.privacy);
  document.title = t('appName');
}
function toast(msg, undoFn) {
  clearTimeout(toastTimer);
  toastEl.innerHTML = `<span>${esc(msg)}</span>${undoFn ? `<button id="undoBtn">${t('undo')}</button>` : ''}`;
  toastEl.classList.add('show');
  if (undoFn) $('#undoBtn').onclick = () => { undoFn(); toastEl.classList.remove('show'); };
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 5000);
}
function openSheet(html, center = false) {
  overlay.innerHTML = `<div class="sheet${center ? ' center' : ''}" role="dialog">${center ? '' : '<div class="grab"></div>'}${html}</div>`;
  overlay.classList.add('show');
  return $('.sheet', overlay);
}
function closeSheet() { overlay.classList.remove('show'); overlay.innerHTML = ''; draft = null; }
overlay.addEventListener('click', e => { if (e.target === overlay && !overlay.dataset.modal) closeSheet(); });

function go(v, arg = null) { view = v; viewArg = arg; render(); window.scrollTo(0, 0); }
function render() {
  applyChrome();
  const s = st();
  if (!s.settings.onboarded) { fab.style.display = tabs.style.display = 'none'; return renderOnboarding(); }
  fab.style.display = ['home', 'txns'].includes(view) ? 'block' : 'none';
  tabs.style.display = 'flex';
  tabs.innerHTML = [['home', '🏠'], ['txns', '🧾'], ['reports', '📊'], ['settings', '⚙️']]
    .map(([k, e]) => `<button data-tab="${k}" class="${view === k || (view === 'report' && k === 'reports') ? 'on' : ''}"><span class="e">${e}</span>${t(k)}</button>`).join('');
  ({ home: renderHome, txns: renderTxns, reports: renderReports, report: renderReportDetail, settings: renderSettings }[view] || renderHome)();
}
tabs.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) go(b.dataset.tab); });
fab.onclick = () => openAdd();

const LANGS = [{ k:'ar', name:'العربية', cc:'sa' }, { k:'en', name:'English', cc:'gb' }, { k:'de', name:'Deutsch', cc:'de' }, { k:'tr', name:'Türkçe', cc:'tr' }];
const langInfo = k => LANGS.find(l => l.k === k) || LANGS[0];
const langBtn = (id, cur) => `<button class="picker" id="${id}">${flag(langInfo(cur).cc)}<span class="grow">${langInfo(cur).name}</span><span>▾</span></button>`;
function openLangPicker(onPick) {
  const cur = st().settings.lang;
  const sh = openSheet(`<div class="row between"><b>${t('language')}</b><button class="link" id="lpX">${t('close')}</button></div>
    <div class="cplist" style="margin-top:10px">${LANGS.map(l => `<button class="cprow ${l.k === cur ? 'on' : ''}" data-lk="${l.k}"><span class="fl">${flag(l.cc)}</span><span class="grow t1">${l.name}</span>${l.k === cur ? '<b>✓</b>' : ''}</button>`).join('')}</div>`);
  $('#lpX', sh).onclick = closeSheet;
  sh.querySelectorAll('[data-lk]').forEach(b => (b.onclick = () => { closeSheet(); st().settings.lang = b.dataset.lk; persist(); onPick && onPick(); render(); }));
}

/* --------------------------------------------------------------- onboarding */
let obStep = 0;
const obData = { salaryDay:27, fixed:'', reportDay:5, currency:'SAR', country:'SA', accounts:[{ id:uid(), cc:'SA', currency:'SAR', income:'', auto:true }] };
function renderOnboarding() {
  const s = st().settings;
  const dots = `<div class="dots">${[0, 1, 2].map(i => `<i class="${i === obStep ? 'on' : ''}"></i>`).join('')}</div>`;
  if (obStep === 0) {
    app.innerHTML = `<div class="ob"><div class="logo">💚</div><h1>${t('ob1Title')}</h1><p>${t('ob1Text')}</p>
      <div class="field" style="margin-top:18px"><label>${t('chooseLang')}</label>
      ${langBtn('obLang', s.lang)}</div>
      ${dots}<button class="btn" id="obNext">${t('next')}</button></div>`;
    $('#obLang').onclick = () => openLangPicker();
  } else if (obStep === 1) {
    app.innerHTML = `<div class="ob"><div class="logo">💰</div><h1>${t('ob2Title')}</h1>
      <div class="field"><label>${t('country')}</label><button class="picker" id="obCountry">${countryLabel(obData.country, obData.currency)}<span>▾</span></button></div>
      <div class="field"><label>${t('accountsQ')}</label>
        ${obData.accounts.map((a, i) => `<div class="acc"><button class="picker" data-acur="${i}">${accLabel(a)}<span>▾</span></button>
          <input class="accInc" data-ai="${i}" type="number" inputmode="decimal" min="0" placeholder="${t('monthlyIncome')}" value="${esc(a.income)}">
          ${obData.accounts.length > 1 ? `<button class="accRm" data-arm="${i}" aria-label="delete">✕</button>` : ''}</div>`).join('')}
        <button class="link" id="obAddAcc" style="margin:4px 0">${t('addAccount')}</button><div class="muted">${t('accountsHint')}</div></div>
      <div class="field"><label>${t('salaryDayQ')}</label><select id="obDay">${Array.from({ length: 31 }, (_, i) => `<option ${i + 1 === +obData.salaryDay ? 'selected' : ''}>${i + 1}</option>`).join('')}</select></div>
      <div class="field"><label>${t('fixedQ')}</label><input id="obFixed" type="number" inputmode="decimal" min="0" placeholder="0" value="${esc(obData.fixed)}"><div class="muted">${t('fixedHint')}</div></div>
      ${dots}<button class="btn" id="obNext">${t('next')}</button></div>`;
    $('#obCountry').onclick = () => { keepOb(); openCountryPicker(obData.country, (cc, cur) => {
      obData.country = cc; obData.currency = cur; st().settings.currency = cur;
      const a = obData.accounts[0]; if (obData.accounts.length === 1 && a.auto) Object.assign(a, { cc, currency: cur });
      render(); refreshRatesUI(); }); };
    app.querySelectorAll('[data-acur]').forEach(b => (b.onclick = () => { keepOb(); const a = obData.accounts[+b.dataset.acur];
      openCountryPicker(a.cc, (cc, cur) => { if (obData.accounts.some(x => x !== a && x.currency === cur)) return toast(t('accExists')); Object.assign(a, { cc, currency: cur, auto: false }); render(); }); }));
    app.querySelectorAll('[data-arm]').forEach(b => (b.onclick = () => { keepOb(); obData.accounts.splice(+b.dataset.arm, 1); render(); }));
    $('#obAddAcc').onclick = () => { keepOb(); openCountryPicker('', (cc, cur) => { if (obData.accounts.some(x => x.currency === cur)) return toast(t('accExists')); obData.accounts.push({ id: uid(), cc, currency: cur, income: '' }); render(); refreshRatesUI(); }); };
  } else {
    const keepDay = s.salaryDay; s.salaryDay = +obData.salaryDay; s.currency = obData.currency;
    const cyc = cycleFor(now()); const totalDays = Math.max(1, dayDiff(cyc.start, cyc.end)); s.salaryDay = keepDay;
    const inc = obData.accounts.reduce((x, a) => x + cv(+a.income || 0, a.currency, obData.currency), 0);
    const daily = Math.max(0, (inc - (+obData.fixed || 0)) / totalDays);
    app.innerHTML = `<div class="ob"><div class="logo">🎉</div><h1>${t('ob3Title')}</h1>
      <div class="card" style="text-align:center"><div class="muted">${t('dailyBudget')}</div><div class="kpi">${money(Math.floor(daily))}</div></div>
      <div class="field"><label>${t('reportDayQ')}</label><select id="obRep">${[0, 1, 2, 3, 4, 5, 6].map(i => `<option value="${i}" ${i === +obData.reportDay ? 'selected' : ''}>${weekdayName(i)}</option>`).join('')}</select></div>
      <div class="set card"><span>${t('enableNotif')}</span><button class="switch ${s.notif ? 'on' : ''}" id="obNotif"></button></div>
      <p class="muted">${t('privacyNote')}</p>
      ${dots}<button class="btn" id="obNext">${t('start')}</button></div>`;
    $('#obNotif').onclick = async () => { keepOb(); await toggleNotif(); renderOnboarding(); };
  }
  $('#obNext').onclick = () => {
    keepOb();
    if (obStep === 1 && !obData.accounts.some(a => +a.income > 0)) { toast(t('incomeReq')); $('.accInc').focus(); return; }
    if (obStep === 0) refreshRatesUI();
    if (obStep < 2) { obStep++; return render(); }
    const s2 = st();
    s2.accounts = obData.accounts.map(a => ({ id: a.id, cc: a.cc, currency: a.currency, income: +a.income || 0 }));
    Object.assign(s2.settings, { salary:0, salaryDay:+obData.salaryDay, fixed:+obData.fixed || 0, reportDay:+obData.reportDay, currency:obData.currency, country:obData.country, onboarded:true, installedAt:todayStr() });
    s2.cycleSalary[cycleFor(now()).key] = Object.fromEntries(s2.accounts.map(a => [a.id, a.income]));
    persist(); go('home');
  };
}
function keepOb() {
  app.querySelectorAll('.accInc').forEach(i => (obData.accounts[+i.dataset.ai].income = i.value));
  if ($('#obDay')) obData.salaryDay = $('#obDay').value;
  if ($('#obFixed')) obData.fixed = $('#obFixed').value;
  if ($('#obRep')) obData.reportDay = $('#obRep').value;
}

/* --------------------------------------------------------------- home */
function txRow(e) {
  const c = catById(e.categoryId) || catById('other');
  return `<button class="tx" data-edit="${e.id}"><span class="ic" style="background:${c.color}22">${c.icon}</span>
    <span class="grow"><div class="t1">${esc(e.note || catName(c))}</div><div class="t2">${esc(catName(c))} · ${relDay(e.date)}</div></span>
    <span class="a" style="text-align:end">${money(e.amount, expCur(e))}${expCur(e) !== home() ? `<div class="t2">≈ ${money(valH(e))}</div>` : ''}</span></button>`;
}
function bindRows(root = app) { root.querySelectorAll('[data-edit]').forEach(b => (b.onclick = () => openAdd(st().expenses.find(x => x.id === b.dataset.edit)))); }
function renderHome() {
  const s = st(); const cs = cycleStats(); const d = now();
  const over = cs.safeToday < 0;
  const pct = cs.income > 0 ? Math.min(100, cs.usedPct) : 0;
  const unseen = s.reports.find(r => !r.seen);
  const recent = [...s.expenses].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
  const remindNow = d.getHours() >= s.settings.reminderHour && !s.expenses.some(e => e.date === todayStr());
  let forecast = t('noSpendYet');
  if (cs.runOut === 'now') forecast = t('runOutNow');
  else if (cs.runOut) forecast = t('runOut', { d: fmtDate(cs.runOut, { day:'numeric', month:'long' }) });
  else if (cs.onTrack) forecast = t('onTrack');
  const firstWeek = dayDiff(parse(s.settings.installedAt), d) < 7;
  app.innerHTML = `
    <div class="row between"><div><h1 style="margin-bottom:0">${t('appName')}</h1>
      <div class="muted">${fmtDate(d, { weekday:'long', day:'numeric', month:'long' })} · ${hijri(d)}</div></div>
      <button class="eye" id="eye" aria-label="privacy">${s.settings.privacy ? '🙈' : '👁️'}</button></div>
    <div style="height:12px"></div>
    ${unseen ? `<div class="banner"><span class="grow">${t('newReport')}</span><button class="btn sm" id="openRep">${t('open')}</button></div>` : ''}
    ${remindNow ? `<div class="banner warn"><span class="grow">📝 ${t('remindBanner')}</span><button class="btn sm" id="remAdd">${t('addNow')}</button></div>` : ''}
    <div class="hero ${over ? 'over' : ''}">
      <div class="lbl">${over ? t('overToday') : t('safeToday')}</div>
      <div class="big">${money(over ? Math.ceil(-cs.safeToday) : Math.floor(cs.safeToday))}</div>
      <div class="sub">${t('ofDaily', { x: money(Math.floor(cs.daily)) })} · ${t('daysToSalary', { n: cs.daysLeft })}</div>
    </div>
    <div class="card">
      <div class="row between"><span class="muted">${t('remaining')}</span><span class="pill">${cs.usedPct}%</span></div>
      <div class="kpi">${money(cs.remaining)}</div>
      <div class="bar ${paceCls(cs)}"><i style="width:${pct}%"></i></div>
      <div class="muted">${t('spentOf', { a: money(cs.spent + cs.fixed), b: money(cs.income) })}</div>
      <div style="margin-top:8px;font-size:14px">${forecast}</div>
    </div>
    ${accountsCard(cs)}
    ${firstWeek && !s.settings.backupTipDismissed ? `<div class="banner"><span class="grow">💾 ${t('backupTip')}</span><button class="link" id="dismissBk">${t('gotIt')}</button></div>` : ''}
    <div class="row between"><h2>${t('recent')}</h2>${recent.length ? `<button class="link" id="seeAll">${t('seeAll')}</button>` : ''}</div>
    <div class="card">${recent.length ? recent.map(txRow).join('') : `<div class="empty">${t('empty')}</div>`}</div>`;
  $('#eye').onclick = () => { s.settings.privacy = !s.settings.privacy; persist(); render(); };
  if (unseen) $('#openRep').onclick = () => go('report', unseen.weekStart);
  if (remindNow) $('#remAdd').onclick = () => openAdd();
  if ($('#dismissBk')) $('#dismissBk').onclick = () => { s.settings.backupTipDismissed = true; persist(); render(); };
  if ($('#seeAll')) $('#seeAll').onclick = () => go('txns');
  bindRows();
}

function ratesLine() {
  const R0 = st().rates;
  return R0.ts ? t('ratesInfo', { src: esc(R0.src), d: fmtDate(new Date(R0.ts), { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) }) : t('ratesNone');
}
function accountsCard(cs) {
  const multi = cs.accs.length > 1 || cs.accs.some(a => a.currency !== home());
  if (!multi) return '';
  const total = cs.accs.reduce((x, a) => x + a.balanceHome, 0);
  const neg = cs.accs.filter(a => a.balance < 0);
  const miss = [...missingRates].filter(c => neededCurs().includes(c));
  return `<div class="row between"><h2>${t('accounts')}</h2></div><div class="card">
    ${cs.accs.map(a => `<div class="accrow"><span class="fl">${flag(a.cc)}</span><span class="grow"><b dir="ltr">${a.currency}</b><div class="t2">${esc(dn('currency', a.currency))}</div></span>
      <span style="text-align:end"><b class="${a.balance < 0 ? 'neg' : ''}">${money(a.balance, a.currency)}</b>${a.currency !== home() ? `<div class="t2">≈ ${money(a.balanceHome)}</div>` : ''}</span></div>`).join('')}
    <div class="accrow total"><span class="grow"><b>${t('totalApprox')}</b></span><b class="${total < 0 ? 'neg' : ''}" style="font-size:18px">≈ ${money(total)}</b></div>
    ${total < 0 ? `<div class="banner warn" style="margin:8px 0 0">${t('totalNeg')}</div>` : neg.map(a => `<div class="muted" style="margin-top:6px">${t('accNeg', { a: a.currency })}</div>`).join('')}
    ${miss.map(c => `<div class="banner warn" style="margin:8px 0 0">${t('noRate', { c })}</div>`).join('')}
    <div class="muted" style="margin-top:8px">💱 ${ratesLine()}</div></div>`;
}

/* --------------------------------------------------------------- add / edit sheet */
let draft = null;
function openAdd(exp) {
  const first = sortedCats()[0];
  draft = exp
    ? { id: exp.id, amountStr: String(exp.amount), categoryId: exp.categoryId, note: exp.note || '', date: exp.date, manual: true, suggested: null, accountId: exp.accountId }
    : { id: null, amountStr: '', categoryId: (first && first.id) || 'other', note: '', date: todayStr(), manual: false, suggested: null, accountId: (accById(st().meta.lastAcc) || {}).id };
  const sh = openSheet(`
    <div class="row between"><b>${exp ? t('editExpense') : t('addExpense')}</b><button class="link" id="shClose">${t('close')}</button></div>
    <div class="amountDisp" id="amt"></div>
    ${st().accounts.length > 1 ? `<div class="chips" id="accChips" style="justify-content:center;margin-top:0"></div>` : ''}
    <input id="note" placeholder="${t('notePh')}" value="${esc(draft.note)}" autocomplete="off">
    <div class="chips" id="chips"></div>
    <div class="keypad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map(k => `<button data-k="${k}">${k}</button>`).join('')}</div>
    <div class="row" style="margin-bottom:10px"><label class="muted" style="flex:none">${t('date')}</label><input type="date" id="dt" value="${draft.date}" max="${ymd(addDays(now(), 365))}"></div>
    <div class="row">${exp ? `<button class="btn danger" id="del" style="flex:1">${t('delete')}</button>` : ''}<button class="btn" id="saveBtn" style="flex:2">${t('save')}</button></div>`);
  renderAmt(); renderChips(); renderAccChips();
  $('#shClose', sh).onclick = closeSheet;
  sh.querySelectorAll('[data-k]').forEach(b => (b.onclick = () => key(b.dataset.k)));
  $('#note', sh).oninput = e => {
    draft.note = e.target.value;
    draft.suggested = suggestCategory(draft.note);
    if (!draft.manual && draft.suggested) draft.categoryId = draft.suggested;
    renderChips();
  };
  $('#dt', sh).onchange = e => (draft.date = e.target.value || todayStr());
  $('#saveBtn', sh).onclick = saveDraft;
  if (exp) $('#del', sh).onclick = () => deleteExpense(exp.id);
}
function key(k) {
  if (!draft) return;
  let a = draft.amountStr;
  if (k === '⌫') a = a.slice(0, -1);
  else if (k === '.') { if (!a.includes('.')) a = (a || '0') + '.'; }
  else { if (a.includes('.') && a.split('.')[1].length >= 2) return; if (a.replace('.', '').length >= 9) return; a = a === '0' ? k : a + k; }
  draft.amountStr = a; renderAmt();
}
function renderAmt() {
  const el = $('#amt'); if (!el) return; const c = accCur(draft.accountId); const v = parseFloat(draft.amountStr) || 0;
  el.innerHTML = `<bdi dir="ltr">${esc(draft.amountStr || '0')}</bdi> <span class="cur">${curLabel(c)}</span>${c !== home() && v ? `<div class="muted" style="font-size:14px;font-weight:600">≈ ${money(cv(v, c))}</div>` : ''}`;
}
function renderAccChips() {
  const el = $('#accChips'); if (!el) return;
  el.innerHTML = st().accounts.map(a => `<button class="chip ${a.id === draft.accountId ? 'on' : ''}" data-acc="${a.id}">${flag(a.cc)} <b dir="ltr">${a.currency}</b></button>`).join('');
  el.querySelectorAll('[data-acc]').forEach(b => (b.onclick = () => { draft.accountId = b.dataset.acc; renderAccChips(); renderAmt(); }));
}
function renderChips() {
  const el = $('#chips'); if (!el) return;
  el.innerHTML = sortedCats().map(c => `<button class="chip ${c.id === draft.categoryId ? 'on' : ''}" data-cat="${c.id}">${c.icon} ${esc(catName(c))}${c.id === draft.suggested ? ` <span class="sg">${t('suggested')}</span>` : ''}</button>`).join('');
  el.querySelectorAll('[data-cat]').forEach(b => (b.onclick = () => { draft.categoryId = b.dataset.cat; draft.manual = true; renderChips(); }));
}
function saveDraft() {
  const s = st(); const amount = Math.round(parseFloat(draft.amountStr) * 100) / 100;
  if (!(amount > 0)) { const el = $('#amt'); el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); toast(t('enterAmount')); return; }
  const note = draft.note.trim();
  if (note) learn(note, draft.categoryId);
  if (draft.id) {
    const i = s.expenses.findIndex(e => e.id === draft.id);
    if (i >= 0) s.expenses[i] = { ...s.expenses[i], amount, accountId: draft.accountId, categoryId: draft.categoryId, note, merchant: note, date: draft.date };
    persist(); closeSheet(); render(); toast(t('updated'));
  } else {
    s.meta.lastAcc = draft.accountId;
    const e = { id: uid(), amount, accountId: draft.accountId, categoryId: draft.categoryId, merchant: note, note, date: draft.date, source: 'manual', createdAt: new Date().toISOString() };
    s.expenses.push(e); persist(); closeSheet(); render();
    toast(`${t('saved')} · ${moneyTxt(amount, accCur(draft ? draft.accountId : e.accountId))}`, () => { s.expenses = s.expenses.filter(x => x.id !== e.id); persist(); render(); });
  }
}
function deleteExpense(id) {
  const s = st(); const idx = s.expenses.findIndex(e => e.id === id); if (idx < 0) return;
  const [removed] = s.expenses.splice(idx, 1); persist(); closeSheet(); render();
  toast(t('deleted'), () => { s.expenses.push(removed); persist(); render(); });
}
document.addEventListener('keydown', e => {
  if (!draft || document.activeElement?.tagName === 'INPUT') { if (draft && e.key === 'Enter') saveDraft(); return; }
  if (/^[0-9.]$/.test(e.key)) key(e.key); else if (e.key === 'Backspace') key('⌫'); else if (e.key === 'Enter') saveDraft(); else if (e.key === 'Escape') closeSheet();
});

/* --------------------------------------------------------------- transactions */
function renderTxns() {
  const s = st(); const f = txFilter;
  let list = [...s.expenses];
  if (f.period === 'cycle') { const c = cycleFor(now()); list = between(list, ymd(c.start), ymd(c.end)); }
  else if (f.period === 'month') { const p = todayStr().slice(0, 7); list = list.filter(e => e.date.startsWith(p)); }
  if (f.cat) list = list.filter(e => e.categoryId === f.cat);
  if (f.q.trim()) { const q = norm(f.q.trim()); list = list.filter(e => norm(e.note).includes(q) || norm(catName(catById(e.categoryId))).includes(q) || String(e.amount).includes(q)); }
  list.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
  const groups = {}; for (const e of list) (groups[e.date] = groups[e.date] || []).push(e);
  app.innerHTML = `<h1>${t('txns')}</h1>
    <input id="q" type="search" placeholder="${t('search')}" value="${esc(f.q)}" style="margin-bottom:10px">
    <div class="seg">${[['cycle', 'thisCycle'], ['month', 'thisMonth'], ['all', 'all']].map(([k, l]) => `<button data-p="${k}" class="${f.period === k ? 'on' : ''}">${t(l)}</button>`).join('')}</div>
    <select id="fc" style="margin-bottom:10px"><option value="">${t('allCats')}</option>${s.categories.map(c => `<option value="${c.id}" ${f.cat === c.id ? 'selected' : ''}>${c.icon} ${esc(catName(c))}</option>`).join('')}</select>
    <div class="card row between"><span>${t('total')} · <span class="muted">${t('count', { n: list.length })}</span></span><b>${money(sumH(list))}</b></div>
    <div id="txList">${list.length ? Object.entries(groups).map(([d, l]) => `<div class="dayhdr"><span>${relDay(d)}</span><span>${money(sumH(l))}</span></div><div class="card" style="padding:4px 16px">${l.map(txRow).join('')}</div>`).join('') : `<div class="empty">${s.expenses.length ? t('noResults') : t('empty')}</div>`}</div>`;
  const q = $('#q'); q.oninput = () => { f.q = q.value; const pos = q.selectionStart; renderTxns(); const nq = $('#q'); nq.focus(); nq.setSelectionRange(pos, pos); };
  app.querySelectorAll('[data-p]').forEach(b => (b.onclick = () => { f.period = b.dataset.p; renderTxns(); }));
  $('#fc').onchange = e => { f.cat = e.target.value; renderTxns(); };
  bindRows();
}

/* --------------------------------------------------------------- reports */
function donut(cats, total) {
  if (!total) return '';
  const R = 52, C = 2 * Math.PI * R; let off = 0;
  const segs = cats.map(c => { const len = (c.amount / total) * C; const sg = `<circle r="${R}" cx="70" cy="70" fill="none" stroke="${c.cat.color}" stroke-width="22" stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 70 70)"/>`; off += len; return sg; }).join('');
  return `<svg viewBox="0 0 140 140" width="150" height="150" role="img" aria-label="${t('whereSpent')}">${segs}</svg>`;
}
function reportHTML(r) {
  const ch = r.change == null ? `<span class="muted">${t('noPrev')}</span>` : r.change === 0 ? `<span class="muted">${t('same')}</span>`
    : `<span class="${r.change > 0 ? 'up' : 'down'}">${r.change > 0 ? '↑' : '↓'} ${Math.abs(r.change)}%</span> <span class="muted">${t('vsLast')}</span>`;
  const range = `${fmtDate(r.ws, { day:'numeric', month:'short' })} – ${fmtDate(r.end, { day:'numeric', month:'short' })}`;
  return `
    <div class="card"><div class="muted">${t('totalSpent')} · ${range}</div><div class="kpi">${money(r.total)}</div><div>${ch}</div></div>
    <div class="card"><b>${t('whereSpent')}</b>
      ${r.total ? `<div class="row" style="margin-top:8px"><div>${donut(r.cats, r.total)}</div><div class="grow">
        ${r.cats.slice(0, 3).map(c => `<div class="legend"><span class="dot" style="background:${c.cat.color}"></span><span class="grow">${c.cat.icon} ${esc(catName(c.cat))}</span><b>${Math.round((c.amount / r.total) * 100)}%</b></div>`).join('')}
        ${r.cats.length > 3 ? `<div class="muted">+${r.cats.length - 3}</div>` : ''}</div></div>` : `<div class="empty">${t('nothing')}</div>`}
    </div>
    ${r.top.length ? `<div class="card"><b>${t('topExpenses')}</b>${r.top.map(txRow).join('')}</div>` : ''}
    ${r.topDay ? `<div class="card">📅 ${t('topDay', { d: `<b>${fmtDate(r.topDay, { weekday:'long' })}</b>` })}</div>` : ''}
    <div class="card"><b>${t('budgetStatus')}</b><div class="bar ${paceCls(r.cs)}"><i style="width:${Math.min(100, r.cs.usedPct)}%"></i></div>
      <div>${t('budgetLine', { p: r.cs.usedPct, n: r.daysAfter })}</div></div>
    <div class="tipbox"><b>${t('tip')}</b><div style="margin-top:4px">${esc(r.tip)}</div></div>`;
}
function renderReports() {
  const s = st(); generateReports();
  const cur = buildReport(weekStartOf(now()));
  const cs = cycleStats(); const c = cycleFor(now());
  const cycleCats = catTotals(between(s.expenses, ymd(c.start), ymd(addDays(now(), 1))));
  const nextRepDay = addDays(weekStartOf(now()), 7);
  app.innerHTML = `<h1>${t('reports')}</h1>
    <h2 style="margin-top:4px">${t('thisWeek')}</h2>${reportHTML(cur)}
    <h2>${t('history')}</h2>
    <div class="card" style="padding:4px 16px">${s.reports.length ? s.reports.map(r => {
      const ws = parse(r.weekStart); const total = sumH(between(s.expenses, r.weekStart, ymd(addDays(ws, 7))));
      return `<button class="rep" data-rep="${r.weekStart}"><span>${t('week')} ${fmtDate(ws, { day:'numeric', month:'short' })} – ${fmtDate(addDays(ws, 6), { day:'numeric', month:'short' })}${r.seen ? '' : '<span class="new">NEW</span>'}</span><b>${money(total)}</b></button>`;
    }).join('') : `<div class="empty">${t('noHistory', { d: fmtDate(nextRepDay, { weekday:'long', day:'numeric', month:'short' }) })}</div>`}</div>
    <h2>${t('byCycle')}</h2>
    <div class="card">${cycleCats.length ? cycleCats.map(x => `<div class="legend"><span class="ic" style="width:32px;height:32px;font-size:16px;background:${x.cat.color}22">${x.cat.icon}</span><span class="grow">${esc(catName(x.cat))}<div class="bar" style="margin:4px 0 0;height:6px"><i style="width:${Math.round((x.amount / cs.spent) * 100)}%;background:${x.cat.color}"></i></div></span><b>${money(x.amount)}</b></div>`).join('') : `<div class="empty">${t('nothing')}</div>`}</div>`;
  app.querySelectorAll('[data-rep]').forEach(b => (b.onclick = () => go('report', b.dataset.rep)));
  bindRows();
}
function renderReportDetail() {
  const s = st(); const rec = s.reports.find(r => r.weekStart === viewArg);
  if (rec && !rec.seen) { rec.seen = true; persist(); }
  const r = buildReport(parse(viewArg));
  app.innerHTML = `<div class="row" style="margin-bottom:6px"><button class="link" id="bk">${isAr() ? '→' : '←'} ${t('back')}</button></div>
    <h1>${t('weekly')}</h1>${reportHTML(r)}`;
  $('#bk').onclick = () => go('reports');
  bindRows();
}

/* --------------------------------------------------------------- settings */
async function toggleNotif() {
  const s = st().settings;
  if (s.notif) { s.notif = false; persist(); return; }
  if (!('Notification' in window)) { toast(t('notifUnsupported')); return; }
  let p = Notification.permission;
  if (p === 'default') { try { p = await Notification.requestPermission(); } catch (e) {} }
  if (p === 'granted') { s.notif = true; persist(); } else toast(t('notifDenied'));
}
function renderSettings() {
  const s = st(); const se = s.settings; const cs = cycleStats();
  const sw = (id, on) => `<button class="switch ${on ? 'on' : ''}" id="${id}"></button>`;
  app.innerHTML = `<h1>${t('settings')}</h1>
    <h2>${t('salarySec')}</h2><div class="card">
      <div class="set"><span>${t('homeCur')}</span><button class="picker" id="sCur" style="max-width:60%">${countryLabel(se.country, se.currency)}<span>▾</span></button></div>
      <div style="padding:12px 0;border-bottom:1px solid var(--line)"><div style="margin-bottom:8px">${t('accounts')} · <span class="muted">${t('monthlyIncome')}</span></div>
        ${s.accounts.map(a => `<div class="acc"><button class="picker" data-scur="${a.id}">${accLabel(a)}<span>▾</span></button>
          <input class="sAccInc" data-sid="${a.id}" type="number" inputmode="decimal" min="0" value="${a.income}">
          <button class="accRm" data-srm="${a.id}" aria-label="delete">✕</button></div>`).join('')}
        <button class="link" id="sAddAcc">${t('addAccount')}</button></div>
      <div class="set"><span>${t('salaryDay')}</span><select id="sDay">${Array.from({ length: 31 }, (_, i) => `<option ${i + 1 === +se.salaryDay ? 'selected' : ''}>${i + 1}</option>`).join('')}</select></div>
      <div class="set"><span>${t('fixed')}<div class="muted">${t('fixedHint')}</div></span><input id="sFix" type="number" inputmode="decimal" min="0" value="${se.fixed}"></div>
      ${cs.extraList.length ? `<div class="set"><span>${t('incomes')}</span><b>${money(sumInc(cs.extraList))}</b></div>` : ''}
      <button class="btn sec" id="addInc" style="margin-top:8px">${t('addIncome')}</button></div>
    <h2>${t('ratesSec')}</h2><div class="card">
      <div class="muted">${ratesLine()}</div>
      ${neededCurs().filter(c => c !== 'USD').map(c => `<div class="set"><span dir="ltr">1 USD =</span><span class="row" style="gap:6px;max-width:65%"><input class="rateIn" data-rc="${c}" type="number" inputmode="decimal" min="0" step="any" value="${st().rateManual[c] || ''}" placeholder="${st().rates.r[c] ? num(st().rates.r[c]) + ' (' + t('auto') + ')' : '?'}" style="max-width:none"><b dir="ltr">${c}</b></span></div>`).join('')}
      <div class="muted" style="margin:8px 0">${t('manualRate')}</div>
      <button class="btn sec" id="sRates">${t('refreshRates')}</button></div>
    <h2>${t('notifSec')}</h2><div class="card">
      <div class="set"><span>${t('enableNotif')}</span>${sw('sNotif', se.notif)}</div>
      <div class="set"><span>${t('reportDay')}</span><select id="sRep">${[0, 1, 2, 3, 4, 5, 6].map(i => `<option value="${i}" ${i === +se.reportDay ? 'selected' : ''}>${weekdayName(i)}</option>`).join('')}</select></div>
      <div class="set"><span>${t('reminder')}</span><select id="sRem">${Array.from({ length: 24 }, (_, i) => `<option value="${i}" ${i === +se.reminderHour ? 'selected' : ''}>${pad(i)}:00</option>`).join('')}</select></div></div>
    <h2>${t('catsSec')}</h2><div class="card">
      <div class="chips">${s.categories.map(c => `<span class="chip">${c.icon} ${esc(catName(c))}${c.custom ? ` <button data-delcat="${c.id}" aria-label="delete">✕</button>` : ''}</span>`).join('')}</div>
      <button class="btn sec" id="addCat">${t('addCat')}</button></div>
    <h2>${t('general')}</h2><div class="card">
      <div class="set"><span>${t('language')}</span><div style="width:60%">${langBtn('sLang', se.lang)}</div></div>
      <div class="set"><span>${t('theme')}</span><select id="sTheme">${['auto', 'light', 'dark'].map(k => `<option value="${k}" ${se.theme === k ? 'selected' : ''}>${t('theme' + k[0].toUpperCase() + k.slice(1))}</option>`).join('')}</select></div>
      <div class="set"><span>${t('privacy')}</span>${sw('sPriv', se.privacy)}</div></div>
    <h2>${t('dataSec')}</h2><div class="card">
      <p class="muted" style="margin-top:0">${t('privacyNote')}</p>
      <div class="row"><button class="btn sec" id="exp">${t('exportBtn')}</button><button class="btn sec" id="imp">${t('importBtn')}</button></div>
      <button class="btn danger" id="wipe" style="margin-top:10px">${t('wipe')}</button></div>
    <p class="muted" style="text-align:center">${t('appName')} v${APP_VERSION}</p>`;
  const numSet = (id, k, after) => ($('#' + id).onchange = e => { se[k] = Math.max(0, +e.target.value || 0); after && after(); persist(); toast('✓'); });
  const ck = () => cycleFor(now()).key;
  app.querySelectorAll('.sAccInc').forEach(i => (i.onchange = () => { const a = accById(i.dataset.sid); a.income = Math.max(0, +i.value || 0); (s.cycleSalary[ck()] = s.cycleSalary[ck()] || {})[a.id] = a.income; persist(); toast('✓'); }));
  app.querySelectorAll('[data-scur]').forEach(b => (b.onclick = () => { const a = accById(b.dataset.scur);
    openCountryPicker(a.cc, (cc, cur) => { if (s.accounts.some(x => x !== a && x.currency === cur)) return toast(t('accExists')); Object.assign(a, { cc, currency: cur }); persist(); render(); refreshRatesUI(); }); }));
  app.querySelectorAll('[data-srm]').forEach(b => (b.onclick = () => { const id = b.dataset.srm;
    if (s.accounts.length < 2 || s.expenses.some(e => e.accountId === id) || s.incomes.some(i => i.accountId === id)) return toast(t('accDelBlocked'));
    s.accounts = s.accounts.filter(a => a.id !== id); persist(); renderSettings(); }));
  $('#sAddAcc').onclick = () => openCountryPicker('', (cc, cur) => { if (s.accounts.some(x => x.currency === cur)) return toast(t('accExists'));
    const a = { id: uid(), cc, currency: cur, income: 0 }; s.accounts.push(a); (s.cycleSalary[ck()] = s.cycleSalary[ck()] || {})[a.id] = 0; persist(); renderSettings(); refreshRatesUI(); });
  app.querySelectorAll('.rateIn').forEach(i => (i.onchange = () => { const v = +i.value; if (v > 0) s.rateManual[i.dataset.rc] = v; else delete s.rateManual[i.dataset.rc]; missingRates.clear(); persist(); toast('✓'); }));
  $('#sRates').onclick = () => { refreshRatesUI(true); setTimeout(() => view === 'settings' && !overlay.classList.contains('show') && renderSettings(), 2500); };
  numSet('sFix', 'fixed');
  $('#sDay').onchange = e => { se.salaryDay = +e.target.value; s.cycleSalary[cycleFor(now()).key] = Object.fromEntries(s.accounts.map(a => [a.id, a.income])); persist(); toast('✓'); };
  $('#sCur').onclick = () => openCountryPicker(se.country, (cc, cur) => { se.country = cc; se.currency = cur; persist(); render(); refreshRatesUI(); });
  $('#sRep').onchange = e => { se.reportDay = +e.target.value; s.reports = []; generateReports(); s.reports.forEach(r => { r.seen = true; r.notified = true; }); persist(); toast('✓'); };
  $('#sRem').onchange = e => { se.reminderHour = +e.target.value; s.meta.lastRemind = ''; persist(); toast('✓'); };
  $('#sNotif').onclick = async () => { await toggleNotif(); renderSettings(); };
  $('#sPriv').onclick = () => { se.privacy = !se.privacy; persist(); render(); };
  $('#sTheme').onchange = e => { se.theme = e.target.value; persist(); render(); };
  $('#sLang').onclick = () => openLangPicker();
  app.querySelectorAll('[data-delcat]').forEach(b => (b.onclick = () => {
    if (!confirm(t('delCatQ'))) return;
    const id = b.dataset.delcat; s.expenses.forEach(e => { if (e.categoryId === id) e.categoryId = 'other'; });
    s.categories = s.categories.filter(c => c.id !== id);
    for (const k of Object.keys(s.learned)) delete s.learned[k][id];
    persist(); renderSettings();
  }));
  $('#addCat').onclick = openAddCat;
  $('#addInc').onclick = openAddIncome;
  $('#exp').onclick = exportData;
  $('#imp').onclick = () => $('#importFile').click();
  $('#wipe').onclick = () => { if (confirm(t('wipeQ'))) { localStorage.removeItem(KEY); const lang = se.lang; STATE = defaultState(); STATE.settings.lang = lang; obStep = 0; persist(); render(); } };
}
const PALETTE = ['#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#ef4444', '#06b6d4', '#84cc16', '#f97316', '#14b8a6', '#a855f7', '#6b7280'];
function openAddCat() {
  let color = PALETTE[7];
  const sh = openSheet(`<b>${t('addCat').replace('+ ', '')}</b><div style="height:10px"></div>
    <div class="field"><label>${t('catName')}</label><input id="cName" maxlength="24"></div>
    <div class="field"><label>${t('emoji')}</label><input id="cIcon" maxlength="4" value="🏷️"></div>
    <div class="field"><label>${t('color')}</label><div class="palette">${PALETTE.map(c => `<button data-col="${c}" style="background:${c}" class="${c === color ? 'on' : ''}"></button>`).join('')}</div></div>
    <div class="row"><button class="btn sec" id="cx">${t('cancel')}</button><button class="btn" id="cs">${t('save')}</button></div>`);
  sh.querySelectorAll('[data-col]').forEach(b => (b.onclick = () => { color = b.dataset.col; sh.querySelectorAll('[data-col]').forEach(x => x.classList.toggle('on', x === b)); }));
  $('#cx', sh).onclick = closeSheet;
  $('#cs', sh).onclick = () => {
    const name = $('#cName', sh).value.trim(); if (!name) return $('#cName', sh).focus();
    st().categories.push({ id: 'c_' + uid(), ar: name, en: name, de: name, tr: name, icon: $('#cIcon', sh).value.trim() || '🏷️', color, custom: true });
    persist(); closeSheet(); renderSettings(); toast(t('catAdded'));
  };
}
function openAddIncome() {
  const sh = openSheet(`<b>${t('addIncome').replace('+ ', '')}</b><div style="height:10px"></div>
    <div class="field"><label>${t('account')}</label><select id="iAcc">${st().accounts.map(a => `<option value="${a.id}">${a.currency} · ${esc(dn('currency', a.currency))}</option>`).join('')}</select></div>
    <div class="field"><label>${t('incomeAmount')}</label><input id="iAmt" type="number" inputmode="decimal" min="0"></div>
    <div class="field"><label>${t('incomeSource')}</label><input id="iSrc"></div>
    <div class="field"><label>${t('date')}</label><input id="iDate" type="date" value="${todayStr()}"></div>
    <div class="row"><button class="btn sec" id="ix">${t('cancel')}</button><button class="btn" id="is">${t('save')}</button></div>`);
  $('#ix', sh).onclick = closeSheet;
  $('#is', sh).onclick = () => {
    const amount = +$('#iAmt', sh).value; if (!(amount > 0)) return $('#iAmt', sh).focus();
    st().incomes.push({ id: uid(), accountId: $('#iAcc', sh).value, amount, source: $('#iSrc', sh).value.trim(), date: $('#iDate', sh).value || todayStr(), is_recurring: false });
    persist(); closeSheet(); render(); toast(t('incomeSaved'));
  };
}
function exportData() {
  const blob = new Blob([JSON.stringify(st(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `masroufi-backup-${todayStr()}.json`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
$('#importFile').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    if (!data || !data.settings || !Array.isArray(data.expenses)) throw new Error('bad');
    if (!confirm(t('importQ'))) return;
    STATE = migrate(data); persist(); render(); toast(t('imported'));
  } catch (err) { toast(t('importErr')); }
});

/* --------------------------------------------------------------- salary-day prompt */
function maybeAskSalary() {
  const s = st(); if (!s.settings.onboarded) return;
  const c = cycleFor(now());
  if (c.key in s.cycleSalary || s.meta.salaryAskSkipped === c.key) return;
  overlay.dataset.modal = '1';
  const sh = openSheet(`<div style="text-align:center;font-size:44px">💰</div><h1 style="text-align:center">${t('salaryArrived')}</h1>
    <p class="muted" style="text-align:center">${t('salaryChanged')}</p>
    ${s.accounts.map(a => `<div class="acc"><span class="row" style="flex:none;gap:6px">${flag(a.cc)}<b dir="ltr">${a.currency}</b></span><input class="nSal" data-nid="${a.id}" type="number" inputmode="decimal" value="${a.income}" style="text-align:center;font-size:18px;font-weight:700"></div>`).join('')}
    <div class="row"><button class="btn sec" id="sLater">${t('later')}</button><button class="btn" id="sOk">${t('confirm')}</button></div>`, true);
  const done = () => { delete overlay.dataset.modal; closeSheet(); render(); };
  $('#sLater', sh).onclick = () => { s.meta.salaryAskSkipped = c.key; persist(); done(); };
  $('#sOk', sh).onclick = () => {
    const m = {}; sh.querySelectorAll('.nSal').forEach(i => { const a = accById(i.dataset.nid); a.income = Math.max(0, +i.value || 0); m[a.id] = a.income; });
    s.cycleSalary[c.key] = m; persist(); done(); toast(t('salaryConfirmed'));
  };
}

/* --------------------------------------------------------------- boot */
STATE = load();
window.__masroufi = { st, cv, fetchRates, suggestCategory, cycleStats, buildReport, weekStartOf, generateReports, render, persist, reload: () => { STATE = load(); render(); } }; // debug/test hook
render();
refreshRatesUI();
checkTimedEvents(); maybeAskSalary(); if (st().settings.onboarded && !overlay.classList.contains('show')) render();
document.addEventListener('visibilitychange', () => { if (!document.hidden) { checkTimedEvents(); if (!overlay.classList.contains('show')) render(); maybeAskSalary(); } });
setInterval(checkTimedEvents, 60 * 1000);
window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', applyChrome);
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
