# -*- coding: utf-8 -*-
import json, os, random

def scramble_letters(word, seed):
    chars = [ch for ch in str(word).lower() if ch.isalpha()]
    if len(chars) <= 1:
        return ' '.join(chars)
    rng = random.Random(seed)
    target = ''.join(chars)
    for _ in range(80):
        shuffled = chars[:]
        rng.shuffle(shuffled)
        if ''.join(shuffled) != target:
            return ' '.join(shuffled)
    shuffled = chars[::-1]
    if ''.join(shuffled) == target and len(shuffled) > 1:
        shuffled[0], shuffled[1] = shuffled[1], shuffled[0]
    return ' '.join(shuffled)

base = os.path.dirname(os.path.abspath(__file__))

def word(w, pos, level, en, cn, article_sent, article_trans, zk, zk_t, g10, g10_t, syn, forms, usage):
    return {
        "word": w, "type": "word", "pos": pos, "level": level,
        "definition_en": en, "definition_cn": cn,
        "article_example": {"sentence": article_sent, "translation": article_trans},
        "examples": {"zhongkao": {"sentence": zk, "translation": zk_t}, "grade10": {"sentence": g10, "translation": g10_t}},
        "synonyms": syn, "word_forms": forms, "other_usage": usage
    }

def phrase(w, ptype, en, cn, article_sent, article_trans, zk, zk_t, g10, g10_t, syn, usage):
    return {
        "word": w, "type": "phrase", "phrase_type": ptype,
        "definition_en": en, "definition_cn": cn,
        "article_example": {"sentence": article_sent, "translation": article_trans},
        "examples": {"zhongkao": {"sentence": zk, "translation": zk_t}, "grade10": {"sentence": g10, "translation": g10_t}},
        "synonyms": syn, "word_forms": [], "other_usage": usage
    }

def pattern(w, en, cn, article_sent, article_trans, zk, zk_t, g10, g10_t, usage):
    return {
        "word": w, "type": "pattern",
        "definition_en": en, "definition_cn": cn,
        "article_example": {"sentence": article_sent, "translation": article_trans},
        "examples": {"zhongkao": {"sentence": zk, "translation": zk_t}, "grade10": {"sentence": g10, "translation": g10_t}},
        "synonyms": [], "word_forms": [], "other_usage": usage
    }

vocabulary = [
word("braille","n.","B1","A system of raised dots that blind people read with their fingers.","盲文；点字",
 "The nonprofit also offers classes in how to read braille.",
 "这家非营利机构也开设盲文阅读课程。",
 "Students learn braille to read books without sight.","学生学习盲文以便在不依赖视力的情况下阅读。",
 "A Harry Potter novel in braille can fill an entire bookshelf.","一本盲文版《哈利·波特》可以占满整个书架。",
 ["raised-dot writing"], ["braille reader"], "read braille 阅读盲文"),
word("impaired","adj.","B1","Weakened or not working fully, especially referring to sight or hearing.","受损的；有障碍的",
 "People who are blind and visually impaired can learn important skills there.",
 "盲人和视障者可以在那里学习重要技能。",
 "Visually impaired students use phones with voice commands.","视障学生使用带语音指令的手机。",
 "The center serves people with impaired vision from across the city.","该中心为全市视障人士提供服务。",
 ["disabled","weakened"], ["impair (v.)","impairment (n.)"], "visually impaired 视障的"),
word("assistive","adj.","B2","Designed to help people with disabilities perform tasks.","辅助的；助残的",
 "Not having enough braille teachers is one reason; the increasing use of assistive technology is another.",
 "盲文教师不足是一个原因，辅助技术的日益普及是另一个原因。",
 "Assistive devices help students access digital learning.","辅助设备帮助学生获取数字化学习资源。",
 "Schools invest in assistive technology for inclusive education.","学校为融合教育投资辅助技术。",
 ["supportive","helpful"], ["assist (v.)"], "assistive technology 辅助技术"),
word("technology","n.","A2","Tools, machines, and systems created to solve problems or perform tasks.","技术；科技",
 "Everybody uses technology like phones and computers to talk to each other.",
 "每个人都使用手机和电脑等技术彼此交流。",
 "Modern technology makes daily communication faster.","现代技术使日常沟通更快捷。",
 "Assistive technology helps blind people live more independently.","辅助技术帮助盲人更独立地生活。",
 ["tech","innovation"], ["technological (adj.)"], "assistive technology 辅助技术"),
word("independence","n.","B1","The ability to do things on your own without needing help from others.","独立；自主",
 "Reading braille allowed her to find independence.",
 "阅读盲文使她获得了独立。",
 "Learning daily skills builds independence for young students.","学习日常技能有助于学生培养独立性。",
 "Technology and braille both support independence for visually impaired people.","技术和盲文都能帮助视障人士实现独立。",
 ["self-reliance","autonomy"], ["independent (adj.)","independently (adv.)"], "live independently 独立生活"),
word("digital","adj.","A2","Related to computers, the Internet, and electronic information.","数字的；数码的",
 "These are skills people need to succeed in today's digital society.",
 "这些是人们在当今数字社会中取得成功所需的技能。",
 "Digital tools help students complete homework online.","数字工具帮助学生在线完成作业。",
 "Godwin teaches skills for navigating a digital world.","戈德温教授在数字世界中导航所需的技能。",
 ["electronic","online"], ["digitally (adv.)","digitize (v.)"], "digital society 数字社会"),
word("nonprofit","n./adj.","B2","An organization that works for a public good rather than to make profit.","非营利机构；非营利的",
 "The nonprofit also offers classes in how to read braille.",
 "这家非营利机构也开设盲文阅读课程。",
 "The nonprofit center provides free training for blind adults.","这家非营利中心为成年盲人提供免费培训。",
 "ASB is a nonprofit that has produced braille products for decades.","ASB 是一家数十年来生产盲文产品的非营利机构。",
 ["charity","NGO"], ["not-for-profit"], "nonprofit organization 非营利组织"),
word("fluent","adj.","B1","Able to read, speak, or use a skill smoothly and easily.","流利的；熟练的",
 "The number of fluent braille readers has dropped for many reasons.",
 "熟练盲文阅读者的数量因多种原因而下降。",
 "She became fluent in English after years of practice.","经过多年练习，她的英语变得很流利。",
 "Fewer than one in ten blind people are fluent braille readers today.","如今不到十分之一的盲人能够熟练阅读盲文。",
 ["skilled","proficient"], ["fluency (n.)","fluently (adv.)"], "fluent braille reader 熟练盲文阅读者"),
word("genetic","adj.","B2","Passed from parents to children through genes; related to heredity.","遗传的；基因的",
 "Godwin is blind due to a rare genetic eye disease.",
 "戈德温因一种罕见的遗传性眼病而失明。",
 "Some illnesses have genetic causes in families.","有些疾病在家族中有遗传原因。",
 "Andrew was born with the same genetic eye disease as his father.","安德鲁出生时与父亲患有同样的遗传性眼病。",
 ["hereditary","inherited"], ["genetics (n.)","genetically (adv.)"], "genetic eye disease 遗传性眼病"),
word("recognize","v.","A2","To know someone or something because you have seen or learned about them before.","认出；识别",
 "Users can program it to recognize faces.",
 "用户可以对其进行编程以识别人脸。",
 "The app can recognize familiar faces in a room.","该应用能识别房间里的熟悉面孔。",
 "Screen readers help users recognize onscreen text through speech.","屏幕阅读器通过语音帮助用户识别屏幕文字。",
 ["identify","know"], ["recognition (n.)","recognizable (adj.)"], "recognize faces 识别人脸"),
word("access","n./v.","B1","The ability to reach, use, or obtain something.","获取；进入；使用权",
 "Technology offers alternatives to braille, he said, but it also makes access to braille easier.",
 "他说，技术为盲文提供了替代方案，但也使获取盲文变得更加容易。",
 "Students need access to online learning materials.","学生需要获取在线学习资料。",
 "Refreshable displays improve access to long braille books.","可刷新显示器改善了对长篇盲文书籍的获取。",
 ["entry","availability"], ["accessible (adj.)","accessibility (n.)"], "access to braille 获取盲文"),
word("affordable","adj.","B1","Not too expensive; priced so most people can pay for it.","负担得起的；价格合理的",
 "Refreshable braille displays are becoming more affordable.",
 "可刷新盲文显示器正变得越来越实惠。",
 "Affordable tools help more families buy assistive devices.","价格合理的工具帮助更多家庭购买辅助设备。",
 "Technology once too costly is now affordable for many blind readers.","曾经过于昂贵的技术如今对许多盲人读者来说已负担得起。",
 ["inexpensive","low-cost"], ["afford (v.)","affordability (n.)"], "more affordable 更加实惠"),
word("crucial","adj.","B1","Extremely important; necessary for success.","至关重要的；关键的",
 "She taught hundreds of students at ASB, and she believes the skill is crucial.",
 "她在 ASB 教过数百名学生，并认为这项技能至关重要。",
 "Good communication skills are crucial in teamwork.","良好的沟通能力在团队合作中至关重要。",
 "Heap argues that braille remains a crucial skill even in a digital age.","希普认为，即使在数字时代，盲文仍然是一项至关重要的技能。",
 ["vital","essential","key"], ["crucially (adv.)"], "crucial skill 关键技能"),
word("retired","adj.","A2","No longer working in a job, especially after reaching a certain age.","退休的",
 "Monica Heap, 65, is a sighted braille instructor who recently retired.",
 "65 岁的莫妮卡·希普是一名有视力的盲文教师，最近已退休。",
 "My grandfather retired after thirty years as a teacher.","我祖父当了三十年教师后退休了。",
 "The retired instructor still believes braille is like paper and pencil.","这位退休教师仍然认为盲文就像纸和笔。",
 ["former"], ["retire (v.)","retirement (n.)"], "recently retired 最近退休"),
word("document","n.","A2","A written or printed paper that gives information.","文件；文档",
 "He used an app to read something from a printed document in front of him.",
 "他使用一款应用朗读面前印刷文件上的内容。",
 "Please save the document before closing the program.","关闭程序前请保存文档。",
 "Apps can scan a printed document and read it aloud.","应用可以扫描印刷文件并朗读出来。",
 ["paper","file","record"], ["document (v.)"], "printed document 印刷文件"),
word("engagement","n.","B2","Active involvement with information or an activity.","参与；投入",
 "When you are bringing it in and interpreting it, it is much more of an active way of engagement.",
 "当你主动接收并理解信息时，这是一种更积极的参与方式。",
 "Class discussion increases student engagement in reading.","课堂讨论能提高学生阅读参与度。",
 "Stephens contrasts passive listening with active engagement through braille.","斯蒂芬斯将被动聆听与通过盲文实现的主动参与进行对比。",
 ["involvement","participation"], ["engage (v.)","engaging (adj.)"], "active engagement 主动参与"),
word("passive","adj.","B2","Receiving information without actively thinking or responding.","被动的",
 "It is one thing to receive information passively as you are listening.",
 "被动地聆听接收信息是一回事。",
 "Watching videos can be a passive way to learn.","观看视频可能是一种被动的学习方式。",
 "Braille reading requires more active work than passive listening.","阅读盲文比被动聆听需要更主动的投入。",
 ["inactive","receptive"], ["passively (adv.)","passivity (n.)"], "receive information passively 被动接收信息"),
word("refreshable","adj.","B2","Able to change displayed text electronically, as on a braille display.","可刷新的",
 "Refreshable braille displays are becoming more affordable.",
 "可刷新盲文显示器正变得越来越实惠。",
 "A refreshable display shows one line of braille at a time.","可刷新显示器一次显示一行盲文。",
 "Refreshable technology lets readers carry long books in one device.","可刷新技术让读者在一台设备中携带长篇书籍。",
 ["updatable"], ["refresh (v.)"], "refreshable braille display 可刷新盲文显示器"),
word("audiobook","n.","B1","A recorded book that people listen to instead of reading print.","有声书",
 "Audiobooks and screen readers make reading faster for people like Godwin.",
 "有声书和屏幕阅读器让戈德温这样的人阅读得更快。",
 "She listens to an audiobook on her way to school.","她在上学路上听有声书。",
 "Audiobooks are one form of assistive technology for blind readers.","有声书是盲人读者的一种辅助技术形式。",
 ["audio book"], ["audio (n./adj.)"], "listen to audiobooks 听有声书"),
word("smartphone","n.","A2","A mobile phone with advanced features such as apps and Internet access.","智能手机",
 "Learning to read braille may be replaced by smartphone app.",
 "学习阅读盲文或许将被智能手机应用所取代。",
 "Many students use a smartphone to check messages.","许多学生用智能手机查看消息。",
 "Godwin teaches visually impaired adults how to use a smartphone.","戈德温教视障成年人如何使用智能手机。",
 ["mobile phone","cellphone"], ["smart (adj.)"], "smartphone app 智能手机应用"),
word("advocacy","n.","B2","Public support for a cause or group; speaking up for others' rights.","倡导；拥护",
 "Tony Stephens is director of advocacy at the American Council of the Blind.",
 "托尼·斯蒂芬斯是美国盲人理事会的倡导事务主任。",
 "Student advocacy helped improve campus accessibility.","学生倡导帮助改善了校园无障碍设施。",
 "Advocacy groups support both braille education and assistive technology.","倡导组织同时支持盲文教育和辅助技术。",
 ["support","promotion"], ["advocate (n./v.)"], "director of advocacy 倡导事务主任"),
word("tailored","adj.","B2","Made or adjusted to fit the specific needs of a person or situation.","量身定制的；针对性的",
 "He tailors the courses to the specific needs of his students.",
 "他根据学生的具体需求量身定制课程。",
 "The teacher tailored the lesson for beginners.","老师为初学者量身定制了课程。",
 "Godwin offers tailored computer lessons for an author who became blind.","戈德温为一位失明的作家提供量身定制的电脑课程。",
 ["customized","adapted"], ["tailor (v.)"], "tailored courses 量身定制的课程"),
word("alternative","n./adj.","B1","Another choice or option; different from the usual one.","替代方案；可供选择的",
 "Technology offers alternatives to braille, he said, but it also makes access to braille easier.",
 "他说，技术为盲文提供了替代方案，但也使获取盲文变得更加容易。",
 "Buses are an alternative to driving to school.","乘公交车是开车上学的另一种选择。",
 "Screen readers are one alternative way to access written text.","屏幕阅读器是获取书面文字的一种替代方式。",
 ["option","substitute"], ["alternatively (adv.)"], "alternatives to braille 盲文的替代方案"),
word("volunteer","n./v.","A2","A person who offers help without pay; to offer help freely.","志愿者；自愿做",
 "After learning to read braille at ASB, she became a volunteer teacher.",
 "在 ASB 学会阅读盲文后，她成为了一名志愿者教师。",
 "Many volunteers help at the community center on weekends.","许多志愿者周末在社区中心帮忙。",
 "Diggins volunteered to teach braille after gaining independence.","迪金斯在获得独立后自愿教授盲文。",
 ["helper"], ["voluntary (adj.)","volunteering (n.)"], "volunteer teacher 志愿者教师"),
]

phrases = [
phrase("visually impaired","adj phrase","Having partial or complete loss of sight.","视障的；视力受损的",
 "People who are blind and visually impaired can learn important skills there.",
 "盲人和视障者可以在那里学习重要技能。",
 "Visually impaired students learn to use phones and computers.","视障学生学习使用手机和电脑。",
 "The class gathered six visually impaired adults in Philadelphia.","课堂上聚集了六名费城视障成年人。",
 ["sight-impaired"], "blind and visually impaired"),
phrase("assistive technology","noun phrase","Devices and software that help people with disabilities.","辅助技术",
 "Not having enough braille teachers is one reason; the increasing use of assistive technology is another.",
 "盲文教师不足是一个原因，辅助技术的日益普及是另一个原因。",
 "Assistive technology includes screen readers and audiobooks.","辅助技术包括屏幕阅读器和有声书。",
 "Schools teach assistive technology for digital independence.","学校教授辅助技术以实现数字独立。",
 ["adaptive technology"], "increasing use of assistive technology"),
phrase("fluent braille reader","noun phrase","A person who can read braille smoothly and easily.","熟练盲文阅读者",
 "The number of fluent braille readers has dropped for many reasons.",
 "熟练盲文阅读者的数量因多种原因而下降。",
 "Few schools now produce many fluent braille readers.","如今很少有学校能培养出大量熟练盲文阅读者。",
 "Andrew is becoming a fluent braille reader at age nine.","九岁的安德鲁正在成为熟练盲文阅读者。",
 ["skilled braille user"], "number of fluent braille readers"),
phrase("screen reader","noun phrase","Software that reads onscreen text aloud.","屏幕阅读器",
 "Audiobooks and screen readers make reading faster for people like Godwin.",
 "有声书和屏幕阅读器让戈德温这样的人阅读得更快。",
 "A screen reader converts email text into spoken speech.","屏幕阅读器将电子邮件文字转换为语音。",
 "Students use a screen reader to hear what is on the computer.","学生用屏幕阅读器听电脑上的内容。",
 ["text-to-speech program"], "programs that convert onscreen text"),
phrase("talk-to-text","noun phrase","Technology that turns spoken words into written text.","语音转文字",
 "Godwin sent a text to his wife using Apple's talk-to-text feature.",
 "戈德温使用苹果的语音转文字功能给妻子发了短信。",
 "Talk-to-text helps blind users write messages quickly.","语音转文字帮助盲人用户快速书写信息。",
 "The talk-to-text feature turns speech into typed words.","语音转文字功能将语音转换为打出的文字。",
 ["speech-to-text","voice typing"], "Apple's talk-to-text feature"),
phrase("refreshable braille display","noun phrase","An electronic device that shows braille dots that can change.","可刷新盲文显示器",
 "Refreshable braille displays are becoming more affordable.",
 "可刷新盲文显示器正变得越来越实惠。",
 "A refreshable braille display can show a whole novel in one hand.","可刷新盲文显示器能让读者一手握持整部小说。",
 "Affordable refreshable braille displays help more readers access long books.","价格实惠的可刷新盲文显示器帮助更多读者获取长篇书籍。",
 ["electronic braille tablet"], "refreshable braille displays"),
phrase("live independently","verb phrase","To manage daily life on one's own without constant help.","独立生活",
 "Technology offers the opportunity for those that are blind or visually impaired to live independently.",
 "技术为盲人和视障者提供了独立生活的机会。",
 "Daily skills training helps adults live independently.","日常技能训练帮助成年人独立生活。",
 "Both braille labels and phone apps support living independently.","盲文标签和手机应用都有助于独立生活。",
 ["be self-reliant"], "opportunity to live independently"),
phrase("digital society","noun phrase","A modern world where people rely on computers, phones, and the Internet.","数字社会",
 "These are skills people need to succeed in today's digital society.",
 "这些是人们在当今数字社会中取得成功所需的技能。",
 "Email and apps are common tools in a digital society.","电子邮件和应用是数字社会中常见的工具。",
 "ASB teaches skills for success in a digital society.","ASB 教授在数字社会中取得成功所需的技能。",
 ["online world"], "today's digital society"),
phrase("genetic eye disease","noun phrase","An eye condition passed down through families.","遗传性眼病",
 "Godwin is blind due to a rare genetic eye disease.",
 "戈德温因一种罕见的遗传性眼病而失明。",
 "Andrew inherited the same genetic eye disease as his father.","安德鲁遗传了与父亲相同的遗传性眼病。",
 "A genetic eye disease can affect vision from birth.","遗传性眼病可能从出生起就影响视力。",
 ["inherited eye condition"], "rare genetic eye disease"),
phrase("braille labels","noun phrase","Small raised-dot tags used to identify items.","盲文标签",
 "She creates braille labels for her clothing, cans and cassettes at home.",
 "她在家里为衣服、罐头和磁带制作盲文标签。",
 "Braille labels help her identify products on her own.","盲文标签帮助她自行识别物品。",
 "Diggins uses braille labels to organize items at home.","迪金斯用盲文标签整理家中物品。",
 ["raised-dot labels"], "create braille labels"),
phrase("design plans and diagrams","noun phrase","Technical drawings used in engineering and building.","设计图和示意图",
 "He says it is important to read design plans and diagrams independently.",
 "他说，能够独立阅读设计图和示意图非常重要。",
 "Engineers study design plans and diagrams every day.","工程师每天都要研究设计图和示意图。",
 "Andrew wants to read design plans and diagrams with braille.","安德鲁希望用盲文阅读设计图和示意图。",
 ["technical drawings"], "read design plans independently"),
phrase("read aloud","verb phrase","To speak written words so others can hear them.","朗读；大声读出",
 "He listened as his emails were read aloud and then used an app to read something from a printed document.",
 "他听着电子邮件被朗读出来，然后用应用朗读面前印刷文件上的内容。",
 "The teacher asked students to read aloud from the passage.","老师让学生朗读课文段落。",
 "Apps can read aloud text from a printed page.","应用可以朗读印刷页面上的文字。",
 ["speak aloud"], "emails were read aloud"),
phrase("active engagement","noun phrase","Taking an active role in understanding information.","主动参与；积极投入",
 "When you are bringing it in and interpreting it, it is much more of an active way of engagement.",
 "当你主动接收并理解信息时，这是一种更积极的参与方式。",
 "Reading braille requires more active engagement than listening alone.","阅读盲文比单纯聆听需要更主动的参与。",
 "Stephens values active engagement with written information.","斯蒂芬斯重视对书面信息的主动参与。",
 ["active involvement"], "active way of engagement"),
phrase("access to the Internet","noun phrase","The ability to connect to and use the online world.","接入互联网；使用网络",
 "What do you do when all of a sudden you do not have access to the Internet?",
 "如果突然无法接入互联网，你该怎么办？",
 "Without access to the Internet, some digital tools stop working.","没有网络接入，一些数字工具就无法使用。",
 "Heap worries about life without access to the Internet.","希普担心失去网络接入后的生活。",
 ["online access"], "don't have access to the Internet"),
phrase("recognize faces","verb phrase","To identify people by their appearance using technology or memory.","识别人脸",
 "Users can program it to recognize faces.",
 "用户可以对其进行编程以识别人脸。",
 "The app can recognize faces in a room without asking.","该应用无需询问就能识别房间里的人脸。",
 "SeeingAI helps blind users recognize faces with a camera.","SeeingAI 帮助盲人用户用摄像头识别人脸。",
 ["identify faces"], "program it to recognize faces"),
phrase("one-on-one computer lessons","noun phrase","Private computer instruction for one student at a time.","一对一电脑课程",
 "Godwin hosts group classes on cellphone use as well as one-on-one computer lessons.",
 "戈德温既开设手机使用小组课，也提供一对一电脑课程。",
 "One-on-one computer lessons match each student's needs.","一对一电脑课程贴合每位学生的需求。",
 "An author who became blind takes one-on-one computer lessons.","一位失明的作家接受一对一电脑课程。",
 ["private computer tutoring"], "one-on-one computer lessons"),
phrase("paper and pencil","noun phrase","Basic tools for writing and learning; used here to compare braille to fundamental literacy.","纸和笔",
 "Braille is like a paper and a pencil, said Heap.",
 "希普说，盲文就像纸和笔。",
 "Students still need paper and pencil for some tasks.","学生有些任务仍需要纸和笔。",
 "Heap compares braille to paper and pencil because it is basic and reliable.","希普把盲文比作纸和笔，因为它基础且可靠。",
 ["basic writing tools"], "braille is like paper and pencil"),
phrase("printed document","noun phrase","A paper with words or information that has been printed.","印刷文件",
 "He used an app to read something from a printed document in front of him.",
 "他使用一款应用朗读面前印刷文件上的内容。",
 "The app scanned the printed document and read it aloud.","应用扫描印刷文件并朗读出来。",
 "A printed document can be read with a camera app.","印刷文件可以用拍照应用朗读。",
 ["hard-copy document"], "read from a printed document"),
]

patterns = [
pattern("... is one reason, ... is another","Used to give two separate causes for a situation.","……是一个原因，……是另一个原因",
 "Not having enough braille teachers is one reason; the increasing use of assistive technology is another.",
 "盲文教师不足是一个原因，辅助技术的日益普及是另一个原因。",
 "Heavy homework is one reason students feel tired; late bedtimes are another.","作业过多是学生感到疲惫的一个原因，晚睡是另一个原因。",
 "Cost is one reason some families hesitate; lack of training is another.","费用是一些家庭犹豫的一个原因，缺乏培训是另一个原因。",
 "A is one reason, B is another"),
pattern("Technology offers the opportunity for ... to ...","Shows how technology enables people to achieve something.","技术为……提供了……的机会",
 "Technology offers the opportunity for those that are blind or visually impaired to live independently.",
 "技术为盲人和视障者提供了独立生活的机会。",
 "Technology offers the opportunity for remote students to join live classes.","技术为远程学生提供了参加直播课的机会。",
 "New apps offer the opportunity for blind readers to identify objects quickly.","新应用为盲人读者提供了快速识别物品的机会。",
 "Technology offers the opportunity for sb. to do sth."),
pattern("It's one thing to ..., but when you're ..., it's much more of an active way of ...","Contrasts passive reception with active involvement.","……是一回事，但当你……时，这是一种更积极的……方式",
 "It is one thing to receive information passively as you are listening, but when you are bringing it in and interpreting it, it is much more of an active way of engagement.",
 "被动地聆听接收信息是一回事，但当你主动接收并理解信息时，这是一种更积极的参与方式。",
 "It is one thing to hear a story, but when you are reading it yourself, it is a more active way of learning.","听故事是一回事，但当你自己阅读时，这是一种更积极的学习方式。",
 "Listening to notes is one thing, but writing your own summary is a more active way of studying.","听笔记是一回事，但自己写摘要是一种更积极的学习方式。",
 "It's one thing to ..., but when you're ..., it's more active"),
pattern("... is like ... and ...","Compares one thing to familiar basic tools or ideas.","……就像……和……",
 "Braille is like a paper and a pencil, said Heap.",
 "希普说，盲文就像纸和笔。",
 "A dictionary is like a map and a guide for new words.","词典就像新词的地图和向导。",
 "Email is like a letter and a mailbox combined in one screen.","电子邮件就像信件和信箱合并在一块屏幕上。",
 "X is like A and B"),
pattern("What do you do when all of a sudden you don't have access to ...?","Raises a problem when an expected resource is unavailable.","如果突然无法获取……，你该怎么办？",
 "What do you do when all of a sudden you do not have access to the Internet?",
 "如果突然无法接入互联网，你该怎么办？",
 "What do you do when all of a sudden you do not have access to electricity?","如果突然断电，你该怎么办？",
 "What do you do when all of a sudden you do not have access to your phone?","如果突然无法使用手机，你该怎么办？",
 "What do you do when you don't have access to ...?"),
pattern("... offers alternatives to ..., but it also makes access to ... easier","Shows that technology can replace something while also improving it.","……为……提供替代方案，但也使获取……更容易",
 "Technology offers alternatives to braille, he said, but it also makes access to braille easier.",
 "他说，技术为盲文提供了替代方案，但也使获取盲文变得更加容易。",
 "E-books offer alternatives to paper books, but they also make access to rare texts easier.","电子书为纸质书提供了替代方案，但也使获取珍稀文本更容易。",
 "Online video offers alternatives to classroom lectures, but it also makes access to review easier.","在线视频为课堂讲授提供了替代方案，但也使复习更容易获取。",
 "offers alternatives to ..., but also makes access to ... easier"),
]

paragraphs = [
{"id":1,"title":"Opening","section_heading":"","image":"section1-intro.png","sentences":[
"PHILADELPHIA, Pennsylvania — On a recent morning, six visually impaired people gathered in a building in Philadelphia's Center City neighborhood.",
"They huddled over their iPhones, waiting for Andrew Godwin's class to begin.",
"The day's lesson? Creating and finding contacts in your cellphone.",
"They were at the Associated Services for the Blind and Visually Impaired center, called ASB for short.",
"People who are blind and visually impaired can learn important skills there — skills people need to succeed in today's digital society.",
"Everybody uses technology like phones and computers to talk to each other.",
"The nonprofit also offers classes in how to read braille, a system of raised dots read with the fingers.",
"However, the number of braille readers has dropped sharply in the last 50 years.",
"In 1960, half of all legally blind children in the U.S. could read braille, according to the American Foundation for the Blind.",
"Today, fewer than 1 in 10 people who are blind have that skill.",
"The number of fluent braille readers has dropped for many reasons.",
"Not having enough braille teachers is one reason; the increasing use of assistive technology is another."],
"socratic":[
{"q":"What is Godwin teaching in the opening scene, and where does the class take place?","a":"He is teaching students how to create and find contacts on their cellphones at the ASB center in Philadelphia's Center City."},
{"q":"How has the number of braille readers changed since 1960?","a":"In 1960 about half of legally blind children could read braille; today fewer than 1 in 10 blind people have that skill."},
{"q":"What two reasons does the article give for the drop in fluent braille readers?","a":"Not enough braille teachers, and the increasing use of assistive technology."}]},
{"id":2,"title":"Godwin's Class","section_heading":"App A New Tool For The Visually Impaired","image":"section2-technology.png","sentences":[
"Technology offers the opportunity for those that are blind or visually impaired to live independently, said Godwin, 46.",
"Godwin is blind due to a rare genetic eye disease passed down in families.",
"He is a married father of two and began teaching at ASB two years ago.",
"Godwin hosts group classes on cellphone use as well as one-on-one computer lessons.",
"He tailors the courses to the specific needs of his students, including an author who became blind but wants to continue his career.",
"To show what he means, Godwin opened an app called SeeingAI on his iPhone and turned the camera to face himself.",
"The phone described aloud what it saw: a man with dark hair, looking happy.",
"The app is not perfect, but it is helpful; users can program it to recognize faces.",
"Audiobooks and screen readers — programs that convert onscreen text into spoken speech — make reading faster for people like Godwin.",
"They are used to relying on their hearing and can understand speech at a faster speed than normal."],
"socratic":[
{"q":"How does Godwin demonstrate assistive technology in class?","a":"He opens the SeeingAI app, points the camera at himself, and the phone describes what it sees aloud; users can also program it to recognize faces."},
{"q":"What personal background does the article share about Godwin?","a":"He is 46, blind from a rare genetic eye disease, a married father of two, and has taught at ASB for two years."},
{"q":"Why do audiobooks and screen readers work well for Godwin and his students?","a":"They are used to relying on hearing and can understand speech at a faster speed than normal."}]},
{"id":3,"title":"Braille Still Matters","section_heading":"Technology Won't Completely Replace Braille","image":"section3-braille-value.png","sentences":[
"However, the new technology is not welcomed by people like 87-year-old Lavera Diggins.",
"She lost her sight when she was 18 and says the loss was like death.",
"Reading braille allowed her to find independence.",
"After learning to read braille at ASB, she became a volunteer teacher.",
"She creates braille labels for her clothing, cans and cassettes at home to identify products on her own.",
"Diggins does not expect to pick up new technology because of her age, and with braille, once you have it, you can use it.",
"Also, braille lets people process information at their own pace.",
"It is one thing to receive information passively as you are listening, but when you are bringing it in and interpreting it, it is much more of an active way of engagement, said Tony Stephens, director of advocacy at the American Council of the Blind.",
"Technology offers alternatives to braille, he said, but it also makes access to braille easier.",
"Refreshable braille displays are becoming more affordable.",
"Braille texts are big — just one Harry Potter novel in braille fills a bookshelf.",
"People who once stayed away for that reason can now carry a Harry Potter book in one hand."],
"socratic":[
{"q":"How did braille change Lavera Diggins's life?","a":"After losing her sight at 18, reading braille gave her independence; she later volunteered as a teacher and uses braille labels at home."},
{"q":"What is the difference between passive listening and active engagement according to Tony Stephens?","a":"Listening passively is different from actively bringing in and interpreting information; braille supports a more active way of engagement."},
{"q":"How does new technology also help braille readers?","a":"Refreshable braille displays are becoming more affordable, so readers can carry long books like Harry Potter in one hand instead of filling a bookshelf."}]},
{"id":4,"title":"Heap & Andrew","section_heading":"","image":"section4-independence.png","sentences":[
"Monica Heap, 65, is a sighted braille instructor who recently retired.",
"She taught hundreds of students at ASB, and she believes the skill is crucial.",
"Braille is like a paper and a pencil, said Heap.",
"What do you do when all of a sudden you do not have access to the Internet?",
"Godwin does not read braille other than on short labels and notes around his house.",
"His 9-year-old son Andrew, who was born with the same genetic eye disease, is a big braille reader.",
"Andrew wants to be an engineer.",
"He says it is important to read design plans and diagrams independently."],
"socratic":[
{"q":"Why does Monica Heap compare braille to paper and pencil?","a":"She sees braille as a basic, reliable skill that remains useful even when technology like the Internet is unavailable."},
{"q":"How do Godwin and his son Andrew differ in their use of braille?","a":"Godwin mostly uses braille only on short labels and notes at home, while nine-year-old Andrew is a big braille reader."},
{"q":"Why does Andrew believe braille is important for his future career?","a":"He wants to be an engineer and needs to read design plans and diagrams independently."}]},
{"id":5,"title":"Future Classroom","section_heading":"","image":"section5-future.png","sentences":[
"Still, in Godwin's classes, a future without braille seems possible.",
"On that particular morning, cellphones spoke quiet commands to their users.",
"Godwin sent a text to his wife using Apple's talk-to-text feature.",
"He listened as his emails were read aloud and then used an app to read something from a printed document in front of him.",
"Together, Godwin and his students worked through the students' technological challenges.",
"I love learning with you guys, Godwin said.",
"There is never a class of students that does not make my brain work hard."],
"socratic":[
{"q":"What technologies does Godwin use during the class described at the end?","a":"Cellphones with voice commands, talk-to-text for texting, emails read aloud, and an app that reads a printed document."},
{"q":"What does the article suggest about the future of braille in Godwin's classroom?","a":"A future without braille seems possible because his classes focus heavily on technology."},
{"q":"How does Godwin feel about teaching his students?","a":"He loves learning with them and says every class makes his brain work hard."}]},
]

all_sentences = []
for p in paragraphs:
    for s in p["sentences"]:
        all_sentences.append({"text": s, "paragraph_id": p["id"], "paragraph_title": p.get("section_heading") or p["title"]})

article_full = "\n\n".join(
    (p.get("section_heading") or p["title"]) + "\n" + " ".join(p["sentences"])
    for p in paragraphs
)

article_lead = (
    "At the Associated Services for the Blind in Philadelphia, Andrew Godwin teaches visually impaired adults "
    "how to use smartphones and computers — while fewer than one in ten blind Americans today can read braille, "
    "down from about half in 1960, as assistive technology grows and braille teachers remain scarce."
)

quiz = {
  "spelling": [
    {"hint_cn": "盲文", "hint_en": "Raised dots read with the fingers by blind people.", "answer": "braille"},
    {"hint_cn": "辅助的", "hint_en": "Designed to help people with disabilities.", "answer": "assistive"},
    {"hint_cn": "独立", "hint_en": "The ability to do things on your own.", "answer": "independence"},
    {"hint_cn": "获取；进入", "hint_en": "The ability to reach or use something.", "answer": "access"},
    {"hint_cn": "负担得起的", "hint_en": "Not too expensive.", "answer": "affordable"},
    {"hint_cn": "至关重要的", "hint_en": "Extremely important.", "answer": "crucial"},
    {"hint_cn": "退休的", "hint_en": "No longer working in a job.", "answer": "retired"},
    {"hint_cn": "文件", "hint_en": "A written or printed paper with information.", "answer": "document"},
    {"hint_cn": "遗传的", "hint_en": "Passed from parents to children through genes.", "answer": "genetic"},
    {"hint_cn": "智能手机", "hint_en": "A mobile phone with apps and Internet features.", "answer": "smartphone"},
  ],
  "word_selection": {
    "bank": ["braille","assistive","independence","access","affordable","crucial","technology","fluent","digital","recognize","document","retired"],
    "items": [
      {"sentence": "Fewer than 1 in 10 blind people can read ___ fluently today.", "answer": "braille", "analysis": "read braille 阅读盲文。"},
      {"sentence": "The rising use of ___ technology is one reason braille reading has declined.", "answer": "assistive", "analysis": "assistive technology 辅助技术。"},
      {"sentence": "Godwin says technology helps blind people live ___.", "answer": "independently", "answer_alt": ["independence"], "analysis": "live independently 独立生活。"},
      {"sentence": "Refreshable displays improve ___ to long braille books.", "answer": "access", "analysis": "access to 获取……。"},
      {"sentence": "New braille devices are becoming more ___.", "answer": "affordable", "analysis": "affordable 负担得起的。"},
      {"sentence": "Heap believes braille is a ___ skill even in a digital age.", "answer": "crucial", "analysis": "crucial skill 关键技能。"},
      {"sentence": "Everybody uses ___ like phones and computers in a digital society.", "answer": "technology", "analysis": "technology 技术。"},
      {"sentence": "The number of ___ braille readers has dropped sharply.", "answer": "fluent", "analysis": "fluent braille readers 熟练盲文阅读者。"},
      {"sentence": "ASB teaches skills needed to succeed in today's ___ society.", "answer": "digital", "analysis": "digital society 数字社会。"},
      {"sentence": "The SeeingAI app can ___ faces in a room.", "answer": "recognize", "analysis": "recognize faces 识别人脸。"}
    ]
  },
  "unscramble": [
    {"letters": scramble_letters("braille", 601), "answer": "braille", "hint": "盲文"},
    {"letters": scramble_letters("access", 602), "answer": "access", "hint": "获取"},
    {"letters": scramble_letters("crucial", 603), "answer": "crucial", "hint": "至关重要的"},
    {"letters": scramble_letters("digital", 604), "answer": "digital", "hint": "数字的"},
    {"letters": scramble_letters("genetic", 605), "answer": "genetic", "hint": "遗传的"},
    {"letters": scramble_letters("fluent", 606), "answer": "fluent", "hint": "流利的"},
    {"letters": scramble_letters("document", 607), "answer": "document", "hint": "文件"},
    {"letters": scramble_letters("volunteer", 608), "answer": "volunteer", "hint": "志愿者"},
  ],
  "first_letter": [
    {"before": "Not enough braille teachers is one reason; ___ technology is another.", "letter": "a", "after": "", "answer": "assistive", "analysis": "Assistive 辅助的。"},
    {"before": "Reading braille helped Diggins find ___.", "letter": "i", "after": "", "answer": "independence", "analysis": "Independence 独立。"},
    {"before": "Heap recently ___ after teaching hundreds of students.", "letter": "r", "after": "", "answer": "retired", "analysis": "Retired 退休的。"},
    {"before": "Godwin opened an app to ___ faces in the room.", "letter": "r", "after": "", "answer": "recognize", "analysis": "Recognize 识别。"},
    {"before": "Andrew wants to read design ___ independently.", "letter": "p", "after": " and diagrams.", "answer": "plans", "analysis": "design plans 设计图。"},
    {"before": "Audiobooks and screen readers make reading ___ for Godwin.", "letter": "f", "after": "", "answer": "faster", "analysis": "Faster 更快。"},
    {"before": "A Harry Potter novel in braille fills a ___.", "letter": "b", "after": "", "answer": "bookshelf", "analysis": "Bookshelf 书架。"},
    {"before": "Godwin used talk-to-text to send a ___ to his wife.", "letter": "t", "after": "", "answer": "text", "analysis": "Text 短信。"},
  ],
  "reading_cloze": {
    "passage": "At ASB in Philadelphia, Andrew Godwin teaches ___ [1] impaired adults to use phones and computers. In 1960, about half of blind children could read ___ [2], but today fewer than one in ten can. One reason is the rise of ___ [3] technology. Still, advocates say braille supports ___ [4] and active engagement. New ___ [5] braille displays are more ___ [6], making long books easier to carry.",
    "questions": [
      {"num": 1, "options": ["visually","visibly","vividly"], "answer": "visually", "analysis": "visually impaired 视障的。"},
      {"num": 2, "options": ["braille","email","music"], "answer": "braille", "analysis": "read braille 阅读盲文。"},
      {"num": 3, "options": ["assistive","decorative","musical"], "answer": "assistive", "analysis": "assistive technology 辅助技术。"},
      {"num": 4, "options": ["independence","silence","confusion"], "answer": "independence", "analysis": "braille supports independence 盲文支持独立。"},
      {"num": 5, "options": ["refreshable","breakable","invisible"], "answer": "refreshable", "analysis": "refreshable braille display 可刷新盲文显示器。"},
      {"num": 6, "options": ["affordable","dangerous","endless"], "answer": "affordable", "analysis": "more affordable 更加实惠。"}
    ]
  },
  "comprehension": [
    {"q": "What is MOST likely the reason the author included the quotes from Diggins, Stephens and Heap?", "options": [
      "to highlight people who have benefited from the new technology that helps teach braille",
      "to show that few people use and teach braille currently and that people might stop using it altogether",
      "to prove that braille should be taught to everyone because technology may not last forever",
      "to provide opinions from people who feel that braille is still an important skill to learn"
    ], "answer": 3, "analysis": "D正确：迪金斯、斯蒂芬斯和希普的引语强调盲文仍然重要。"},
    {"q": "Which sentence from the article would be MOST important to include in a summary of the article?", "options": [
      "On a recent morning, six visually impaired people gathered in a building in Philadelphia's Center City neighborhood.",
      "In 1960, half of all legally blind children in the U.S. could read braille, according to the American Foundation for the Blind.",
      "She creates braille labels for her clothing, cans and cassettes at home to identify the products on her own.",
      "Technology offers alternatives to braille, he said, but it also makes access to braille easier."
    ], "answer": 3, "analysis": "D正确：该句概括技术既替代盲文又改善盲文获取的核心矛盾。"},
    {"q": "Read the following sentence from the article. Not having enough braille teachers is one reason, the increasing use of assistive technology is another. HOW does this detail develop the author's CENTRAL idea?", "options": [
      "It provides examples of the different types of technology that have replaced braille.",
      "It shows that more people who are visually impaired feel independent because of technology.",
      "It highlights the main reasons behind the decrease in the number of braille readers.",
      "It demonstrates the ways in which technology is helping people learn to read braille."
    ], "answer": 2, "analysis": "C正确：该句点明盲文读者减少的两个主要原因。"},
    {"q": "Which answer choice accurately characterizes Godwin's reaction to technology for the visually impaired?", "options": [
      "He believes that it is key in helping people who are visually impaired to successfully live on their own.",
      "He believes that learning technology is important but not as important as learning braille.",
      "He thinks that technology should completely replace braille because there is no longer a use for it.",
      "He thinks that people who are visually impaired should be cautious about relying on technology."
    ], "answer": 0, "analysis": "A正确：戈德温认为技术帮助视障者独立生活，并在课堂中积极使用。"}
  ]
}

graphic_organizer = {
  "title": "Braille vs. Technology for the Visually Impaired — Text Structure",
  "sections": [
    {"heading": "Main Idea", "content": "Fewer blind Americans read braille today as assistive technology spreads, but advocates argue braille still matters for independence and active engagement."},
    {"heading": "Section 1: Opening", "content": "Godwin teaches phone skills at ASB Philadelphia; braille readers fell from about half in 1960 to fewer than 1 in 10; scarce teachers and assistive technology are key reasons."},
    {"heading": "Section 2: Godwin's Class", "content": "Godwin, blind from a genetic eye disease, teaches tailored tech lessons; apps like SeeingAI, audiobooks, and screen readers support faster hearing-based reading."},
    {"heading": "Section 3: Braille Still Matters", "content": "Diggins gained independence through braille; Stephens contrasts passive listening with active engagement; affordable refreshable displays make long braille books portable."},
    {"heading": "Section 4: Heap & Andrew", "content": "Retired instructor Heap calls braille crucial like paper and pencil; Andrew, 9, reads braille to study engineering plans independently."},
    {"heading": "Section 5: Future Classroom", "content": "In Godwin's tech-focused classes a future without braille seems possible; students use voice commands, talk-to-text, and document-reading apps together."}
  ]
}

data = {
  "title": "Learning to Read Braille May Be Replaced by Tech",
  "title_full": "Learning to read braille may be replaced by smartphone app",
  "subtitle": "Braille, Assistive Technology & Independence — Reading Courseware",
  "level": "880L",
  "word_count": 900,
  "source": "By Philadelphia Inquirer via Tribune Content Agency, adapted by Newsela staff on 09.25.18",
  "article_lead": article_lead,
  "article_full": article_full,
  "vocabulary": vocabulary,
  "phrases": phrases,
  "patterns": patterns,
  "all_vocab_items": vocabulary + phrases + patterns,
  "paragraphs": paragraphs,
  "all_sentences": all_sentences,
  "quiz": quiz,
  "graphic_organizer": graphic_organizer,
  "comprehension_questions": quiz["comprehension"]
}

path = os.path.join(base, "course-data.json")
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

js_path = os.path.join(base, "..", "js", "course-data.js")
with open(js_path, "w", encoding="utf-8") as f:
    f.write("window.COURSE_DATA = ")
    json.dump(data, f, ensure_ascii=False)
    f.write(";\n")

print("OK json", os.path.getsize(path), "js", os.path.getsize(js_path))
