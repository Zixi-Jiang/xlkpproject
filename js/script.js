document.addEventListener('DOMContentLoaded', () => {
    const patternContainer = document.getElementById('pattern-container');
    const storyModal = document.getElementById('story-modal');
    const patternName = document.getElementById('pattern-name');
    const patternStory = document.getElementById('pattern-story');
    const closeBtn = document.querySelector('.close');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageNumbersContainer = document.getElementById('pageNumbers');

    // 模拟从数据库获取的数据
    const originalPatterns = [
        {
            name: '扎土盖',
            background_story: '太阳与火的崇拜。土家人崇拜太阳，以农历六月初六为太阳的生辰，太阳河流域，不仅是土家文化的故乡，土家织锦也在这里生息发展，土家族人对火的崇拜则是对太阳崇拜的延伸，户户都设有“火床”太阳是正神之祖，象征光明、正气、吉祥。火可以驱邪，保护人间不受邪鬼骚扰。所以，象征太阳和火的“十”在土家民俗中普遍被重视，也是处处事事不可少的文化符号。“扎土盖”的最初本意显然是一个带有原始宗教信仰和道、佛宗教内含的双重图纹形态，它与太阳崇拜及太极图是一脉相承的，象征光明、正中，吉祥，生生不息的卐及其变异，更普遍和直接的大量用于土家织锦中，并表现得淋漓尽致。卐既可单独成型，作为主体图纹使用，也可将其分解成各种勾纹，大量作为陪衬和填充物，成为土家织锦中突出的装饰特征之一。'
        },
        {
            name: '椅子花',
            background_story: '家居亲情的画卷。土家族属于一个山地农耕经济型的民族，以家族和家庭为基本单位，重视血缘亲情，在湘西北的土家族家庭中，椅子是必不可少的实用家具，传统的椅子主要有两种，其一是高椅子，俗称“太师椅”,高约40~45厘米左右，后有垂直的高靠背，左右两旁大部分配有矮扶手。一般为富有人家所有，它配以八仙桌，用于厅堂、集会、请客及祭祀等场合。另一类相对较矮小的椅子，百姓称为“小椅子”,高约25厘米左右，后有不高的斜靠背，无扶手。小椅子广泛为普通人家所用，设计巧妙，劳作奔波了一天的土家人，回到家中，全家人围着“火床(塘)”坐在小椅子上，用餐、闲谈，享受人间亲情人伦，以椅子花为代表的日常器物图纹反映了对现实生活的美好憧憬。'
        },
        {
            name: '阳雀花',
            background_story: '阳雀花纹样的出现来源于土家族的阳雀鸟，在科技落后的古代人们常以各种候鸟来观察天气气候及季节的变化，从而进行农耕活动。阳雀鸟形态小巧可爱，颜色丰富多彩，作为一种报春鸟被土家族人视为吉祥的化身，因此他们通过对阳雀鸟形态的观察，将其进行意象化的变形，以几何线条和几何图形为基础间接地概括其外形特征，加以多样化的色彩搭配，从而形成了土家族织锦所特有的阳雀纹样。也有一种说法认为土家族阳雀花纹样来自土家民俗传说中的“织种女神”——西兰，传说她创造了土家织锦这一艺术品，同时还创作了不同题材不同寓意的织锦纹样，在创作“白果花”纹样时死于白果树下，后来她化作一只阳雀鸟，在每年春暖花开，万物复苏之际都会飞来提醒土家族的人们开始一年的辛勤劳作，为了纪念西兰姑娘，土家人便设计出阳雀花纹样用于土家织锦之中。'
        },
        {
            name: '太阳花',
            background_story: '“太阳花”纹样，这一独特的土家族图案，深深体现了他们对太阳的崇敬。其设计风格奔放而热烈，中心部位巧妙地勾勒出一个“王”字形状，象征着土家族的权威与荣耀。而纹样的延展方式则充分展现了折线艺术的魅力，通过纵向的衍生，成功地传达出太阳那炽热而耀眼的光芒。'
        },
        {
            name: '土王五颗印',
            background_story: '“土王五颗印”纹样，这一土家族独特的艺术表现，深刻反映了他们对土司的深厚敬意。纹样中，土王的大印与四方土司的小印相连结，不仅象征着土家族人对土司的尊崇，还反映了土司制度下权力的层级分配，更体现了他们之间的紧密联系与深厚情感。这一纹样，宛如一幅生动的历史画卷，让我们在欣赏艺术美感的同时，也能感受到土家族文化的深厚底蕴。'
        },
        {
            name: '莲花',
            background_story: '土象族人民热爱原始自然与田何耕种，“卡普”在土家语中也是“花”的意思，自然界里种类丰富的植物自然成为图案题材中不可缺少的一部分。土家族在漫长的发展历程中，不断融合了古巴人、贵州乌蛮、湘西北土著先民等少数民族和汉族的文化元素。这一多元文化的交融，使得莲花这一传统纹样在“西兰卡普”中不仅承载着与汉文化相似的“喜结连理”“和和美美”等吉祥寓意，更融入了土家族特有的文化内涵。'
        },
        {
            name: '梭罗花',
            background_story: '土家族传说中的梭罗树是生长在月球上的不朽之树，武陵山区更是流传着“梭罗花，梭罗桠，梭罗树上开桂花”的俗语。具有“光明”“长生”等象征着蓬勃生命力的寓意。织有梭罗花图案的土花铺盖常作为陪嫁品，在土家《哭嫁歌》中，也有这样一段有关梭罗花的唱词：“梭罗树，梭罗丫，你不坐头丫坐二丫。梭罗树，梭罗台，你不坐头台坐二台。”意为期望新妇自此一去，能坐上土家神树，福寿绵长。'
        },
        {
            name: '马毕',
            background_story: '马毕纹样是土家族织锦中较为古老的纹样之一，其起源可以追溯到土家族早期的生产生活。改土归流前，土家族地区种植的棉花、茶叶等经济作物仅供自销。之后，作为土家族重要经济作物的茶叶得到大规模种植，因物美价廉，利润丰厚各地争相收购，茶叶商贸的繁荣带动了交通的发展，土司茶运中马成为交通运输的重要承载工具，马毕纹样作为动物类纹样的一部分，反映了土家族先民对自然和动物的敬畏。'
        },
        {
            name: '台台花',
            background_story: '远古时代洪水滔天，人类毁灭，“补所”和“雍妮”两兄妹躲进葫芦里得以幸存的故事，叫《雍妮补所》。为了延续人类，兄妹被迫成亲，哥哥羞成了红脸，妹妹羞成为白脸，婚后繁衍了上家、苗家和客家人。土家人为了纪念再造人类的祖先“补所”和“雍妮”，把兄妹俩敬为傩公和傩母，有玩“干（旱）龙船”的风俗，将傩公和傩母供奉于葫芦变成的长板凳船中，由“行坛梯玛乡游而祭。“干龙船”所到之处，户主必须在船头送挂一双孩子穿过的鞋子或其它用物，乞求两位人类始祖保佑。所以，“补所”和“雍妮”作为儿童的保护神，历来受到土家人民的尊重和爱戴，“台台花”盖裙就是这种地域“信仰”的典型民俗用品。'
        },
        {
            name: '四十八勾',
            background_story: '土家族有“蛙”的信仰从语言角度来说，八勾图纹就是意指“青蛙”。在以父系社会为主体的土家氏族社会里，女性（母性）的地位是从属的。以女性为主体创作的土家织锦中，更多的将母爱、多子、避邪驱疫的渴望和企求融进小小的蛙纹之中，世代相承，逐渐“演变成相对稳定的观念符号”，并广泛流传。“作为观念存在，这些符号通过集体意识的渗透作用深入到每个社会个体的意识之中，成为一套家喻户晓的共同语汇”，成为大家都认同的大众符号：四十八勾系列——“蛙人合一”的“图腾”。'
        },
        {
            name: '虎头印',
            background_story: '廪君化虎：据《后汉书·南蛮西南夷列传》记载，土家族先祖廪君率部迁徙，死后化为白虎，后世尊其为“白帝天王”，虎头印即是对这一始祖记忆的永恒铭刻；除此之外，土家族认为白虎星主生死，虎头印中的星纹与雷云纹组合，暗含“星君镇邪”的巫傩信仰。'
        },
        {
            name: '藤藤花',
            background_story: '传说土家族先民遭洪水围困，天神垂降巨藤助人攀岩逃生，幸存者将藤纹织入衣物，铭记神恩。'
        },
        {
            name: '迎亲图',
            background_story: '土家儿女有着别样的婚嫁习俗，婚期到来，男方派人给新娘送去衣裳，首饰、布匹以及给岳父母家酒、肉乃至盐、茶、米、豆等，叫“过礼”。随后新娘上穿右开胸，大袖大摆的“露水衣”，下穿八幅罗裙，叫“露水裙”，头包青丝帕，朱花银饰，琅佩叮当，由人扶着在堂屋哭拜一番，辞别祖先，告别父母，然后坐轿或步行起程，此刻，唢呐、锣鼓、鞭炮齐鸣，大旗大伞前行，迎亲队伍抬着嫁妆抢道走在新人前面，否则会被嬉笑为“送亲客”；送亲队伍在后簇拥着新娘或花轿，一路吹吹打打，充满喜庆气氛。'
        },
        {
            name: '绣球花',
            background_story: '土家族长期居于武陵山区，绣球花（又称“八仙花”）漫山遍野，其适应力强、花期长的特性被赋予神性，成为“大地丰饶”的象征，古代“社祭”仪式中，绣球花常作为祭品装饰，后逐渐演化为织锦纹样，承载祈福功能；传说土家少女以绣球花织锦传递情意，花瓣数量暗含相思之深，母亲则为待嫁女儿织绣球花纹被面，祈愿婚姻如花般繁盛。'
        },
        {
            name: '文字纹',
            background_story: '明清土司向朝廷纳贡，吸收汉字文化，将“福寿”等吉祥字织入贡锦，后渐平民化。土家族将汉字解构重组，如“双喜”简化为几何菱形，形成独特的“字非字，纹非纹”风格。'
        }
    ];

    let patterns = [...originalPatterns]; // 初始化 patterns 为模拟数据
    let currentPage = 1;
    const itemsPerPage = 6;

    // 渲染纹样
    const renderPatterns = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        patternContainer.innerHTML = '';
        patterns.slice(start, end).forEach(pattern => {
            const img = document.createElement('img');
            img.src = `/images/${pattern.name}.jpg`;
            img.alt = pattern.name;
            img.classList.add('pattern-image');
            img.addEventListener('click', () => {
                patternName.textContent = pattern.name;
                patternStory.textContent = pattern.background_story;
                storyModal.style.display = 'block';
            });
            patternContainer.appendChild(img);
        });
    };

    // 渲染分页
    const renderPagination = () => {
        const totalPages = Math.ceil(patterns.length / itemsPerPage);
        pageNumbersContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('button');
            pageItem.className = 'page-number';
            pageItem.innerText = i;
            if (i === currentPage) pageItem.classList.add('active');
            pageItem.addEventListener('click', () => {
                currentPage = i;
                renderPatterns(currentPage);
                renderPagination();
            });
            pageNumbersContainer.appendChild(pageItem);
        }
    };

    // 搜索功能
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            // 如果搜索框不为空，过滤数据
            patterns = originalPatterns.filter(pattern => pattern.name.toLowerCase().includes(searchTerm));
        } else {
            // 如果搜索框为空，重置为原始数据
            patterns = [...originalPatterns];
        }
        currentPage = 1; // 重置当前页为第一页
        renderPatterns(currentPage);
        renderPagination();
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    searchInput.addEventListener('focus', () => {
        searchInput.classList.add('expanded');
    });

    searchInput.addEventListener('blur', () => {
        if (!searchInput.value) {
            searchInput.classList.remove('expanded');
        }
    });

    // 分页按钮事件
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPatterns(currentPage);
            renderPagination();
        }
    });

    nextPageButton.addEventListener('click', () => {
        const totalPages = Math.ceil(patterns.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPatterns(currentPage);
            renderPagination();
        }
    });

    closeBtn.addEventListener('click', () => {
        storyModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === storyModal) {
            storyModal.style.display = 'none';
        }
    });

    // 初始化渲染
    renderPatterns(currentPage);
    renderPagination();
});
