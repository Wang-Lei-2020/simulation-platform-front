<template>
  <div class="icon-sources-wrapper wrapper">
<!--    <el-breadcrumb class="icondetials_header" separator-class="el-icon-arrow-right">-->
<!--      <el-breadcrumb-item :to="{ path: '/resources' }">组件库</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>简介</el-breadcrumb-item>-->
<!--    </el-breadcrumb>-->
    <el-main class="elMain">
      <h1 id="0">基于ARIMA算法的天气预测平台</h1>

      <h2 id="1">1 概述</h2>

      <h3 id="1.1">1.1 实验1：第一个天气预测项目</h3>
      <iframe id = "testMsg" style = "width: 870px;height: 645px;" src = 'https://www.thingjs.com/pp/e7524801afe1e1271b939375' ></iframe>
      <br>

      <h3 id="1.2">1.2 数据预处理</h3>
      <p>现实世界中的大规模数据往往是杂乱的，主要表现为:</p>
      <ol>
        <li>不完整性:数据属性值遗漏或不确定。</li>
        <li>不一致性:由丁原始数据的来源不同，数据定义缺乏统一标准，导致系统间数据内涵不一致，例如:同一属性的命名、单位、字长却不相同。</li>
        <li>有噪声:数据中存在异常(偏离期望值)。</li>
        <li>冗余性:数据记录或属性的重复。</li>
      </ol>
      <p>该类数据无法直接进行数据挖掘，或挖掘结果差强人意。为了提高数据挖掘的质量产生了数据预处理技术。数据预处理有多种方法：数据清理，数据集成，数据变换，数据归约等。这些数据处理技术在数据挖掘之前使用，大大提高了数据挖掘模式的质量，降低实际挖掘所需要的时间。</p>
      <p>数据的预处理是指对所收集数据进行分类或分组前所做的审核、筛选、排序等必要的处理。</p>

      <h4 id="1.2.1">1.2.1 实现简单的数据预处理</h4>
      <p>请尝试修改和运行如下代码，实现对空值数据的删除、填充等预处理操作。可以选择Python或Java语言，点击“运行”按钮后，运行结果将显示在下方文本框中。</p>
      <CodeCompile></CodeCompile>
      <br>
      <br>
      <br>

      <h3 id="1.3">1.3 天气预测平台概述</h3>
      <p>本节课程旨在通过开发一款基于ARIMA算法的天气预测平台，达成两个教学目标：</p>
      <li>掌握预测时序数据的基本流程，掌握ARIMA算法</li>
      <li>掌握网站的基本搭建流程</li>
      <p>天气预测平台应当满足以下基本要求：</p>
      <li>至少具备服务端、客户端、数据库三大部分</li>
      <li>具有分析、处理、存储天气数据的功能</li>
      <li>具有预测模型，可对天气数据进行预测，并将预测数据进行存储</li>
      <li>将天气数据通过浏览器展示到网页上</li>
      <br>

      <h3 id="1.4">1.4 知识点概述</h3>
      <li>- 数据预处理技术</li>
      <li>ARIMA算法预测技术</li>
      <li>web端开发技术</li>
      <li>服务端开发技术</li>
      <li>数据库管理技术</li>
      <br>

      <h2 id="2">2 ARIMA概述</h2>
      <h3 id="2.1">2.1 初识ARIMA</h3>
      <p>ARIMA模型（英语：Autoregressive Integrated Moving Average model），差分整合移动平均自回归模型，又称整合移动平均自回归模型（移动也可称作滑动），是时间序列预测分析方法之一。ARIMA(p，d，q)中，AR是“自回归”，p为自回归项数；MA为“滑动平均”，q为滑动平均项数，d为使之成为平稳序列所做的差分次数（阶数）。“差分”一词虽未出现在ARIMA的英文名称中，却是关键步骤。</p>
      <p>对时间序列数据进行分析和预测比较完善和精确的算法是博克思-詹金斯(Box-Jenkins)方法，其常用模型包括：自回归模型（AR模型）、滑动平均模型（MA模型）、（自回归-滑动平均混合模型）ARMA模型、（差分整合移动平均自回归模型）ARIMA模型。</p>
      <p>ARIMA(p，d，q)模型是ARMA(p，q)模型的扩展。ARIMA(p，d，q)模型可以表示为：</p>
      <p><img style="margin-left: 100px" src="../assets/气温预测平台/1.png"></p>
      <p>其中L是滞后算子（Lag operator），d∈Z，d > 0</p>
      <br>

      <h3 id="2.2">2.2 ARIMA定义</h3>
      <p>非平稳时间序列，在消去其局部水平或者趋势之后，其显示出一定的同质性，也就是说，此时序列的某些部分 与其它部分很相似。这种非平稳时间序列经过差分处理后可以转换为平稳时间序列，那 称这样的时间序列为齐次非平稳时间序列，其中差分的次数就是齐次的阶。</p>
      <p>将▽记为差分算子，那么有</p>
      <p><img style="margin-left: 170px" src="../assets/气温预测平台/2.png"></p>
      <p>对于延迟算子B，有</p>
      <p><img style="margin-left: 200px" src="../assets/气温预测平台/3.png"></p>
      <p>因此可以得出</p>
      <p><img style="margin-left: 200px" src="../assets/气温预测平台/4.png"></p>
      <p>设有d阶其次非平稳时间序列yt，那么有▽dyt是平稳时间序列，则可以设其为ARMA(p,q)模型，即</p>
      <p><img style="margin-left: 200px" src="../assets/气温预测平台/5.png"></p>
      <p>其中</p>
      <p><img style="margin-left: 120px" src="../assets/气温预测平台/6.png"></p>
      <p>分别为自回归系数多项式和滑动平均系数多项式。εt为零均值白噪声序列。可以称所设模型为自回归求和滑动平均模型，记为ARIMA(p,d,q)。</p>
      <p>当差分阶数d为0时，ARIMA模型就等同于ARMA模型，即这两种模型的差别就是差分阶数d是否等于零，也就是序列是否平稳，ARIMA模型对应着非平稳时间序列， ARMA模型对应着平稳时间序列。</p>
      <br>

      <h3 id="2.3">2.3 ARIMA构建步骤</h3>
      <ol>
        <li>时间序列的获取时间序列的获取可以通过实验分析获得，亦或是相关部门的统计数据。对于得到的数据，首先应该检查是否有突兀点的存在，分析这些点的存在是因为人为的疏忽错误还有有其它原因。保证所获得数据的准确性是建立合适模型，是进行正确分析的第一步保障。</li>
        <li>时间序列的预处理时间序列的预处理包括两个方面的检验，平稳性检验和白噪声检验。能够适用ARMA模型进行分析预测的时间序列必须满足的条件是平稳非白噪声序列。对数据的平稳性进行检验是时间序列分析的重要步骤，一般通过时序图和相关图来检验时间序列的平稳性。时序图的特点是直观简单但是误差较大，自相关图即自相关和偏自相关函数图相对复杂但是结果更加准确。本文先用时序图进行直观的判断再利用相关图进行更进一步的检验。对于非平稳时间序列中若存在增长或下降趋势，则需要进行差分处理然后进行平稳性检验直至平稳为止。其中，差分的次数就是模型ARIMA(p,d,q)的阶数，理论上说，差分的次数越多，对时序信息的非平稳确定性信息的提取越充分，但是从理论上说，差分的次数并非越多越好，每一次差分运算，都会造成信息的损失，所以应当避免过分的差分，一般在应用中，差分的阶数不超过2。</li>
        <li>模型识别模型识别即从已知的模型中选择一个与给出的时间序列过程相吻合的模型。模型识别的方法很多，例如Box-Jenkins模型识别方法等。</li>
        <li>模型定阶在确定了模型的类型之后，还需要知道模型的阶数，可使用BIC准则法进行定阶。</li>
        <li>参数估计对模型的参数进行估计的方法通常有相关矩估计法、最小二乘估计以及极大似然估计等。</li>
        <li>模型的验证模型的验证主要是验证模型的拟合效果，如果模型完全或者基本解释了系统数据的相关性，那么模型的噪声序列为白噪声序列，那么模型的验证也就是噪声序列的独立性检验。贝体的检验方法可利用Barlett定理构造检验统计量Q。如果求得的模型通不过检验，那么应该重新拟合模型，直至模型能通过自噪声检验。</li>
      </ol>
      <br>

      <h3 id="2.4">2.4 获取天气数据</h3>
      <a style="margin-left: 20px" href="http://data.cma.cn">国家气象信息中心-中国气象数据网</a>
      <br>

      <h3 id="2.5">2.5 Python环境配置</h3>
      <a style="margin-left: 20px" href="https://blog.csdn.net/m0_67265464/article/details/125241290">Python环境配置教程</a>
      <br>

      <h3 id="2.6">2.6 Spark环境配置</h3>
      <a style="margin-left: 20px" href="https://baijiahao.baidu.com/s?id=1667729831570575392&wfr=spider&for=pc">Spark环境配置</a>
      <br>

      <h3 id="2.7">2.7 使用Spark进行数据预处理</h3>
      <a style="margin-left: 20px" href="https://blog.51cto.com/u_15183480/2747040">使用Spark进行数据预处理</a>
      <br>

      <h3 id="2.8">2.8 ARIMA模型平稳性检验，确定d值</h3>
      <p>对序列绘图，进行 ADF 检验，观察序列是否平稳（一般为不平稳）；对于非平稳时间序列要先进行 d 阶差分，转化为平稳时间序列</p>
      <h4 id="2.8.1">2.8.1 平稳性概念</h4>
      <p>假定某个时间序列是由一系列随机过程生成的，即假定时间序列 xt(t=1,2,3,4,5) 的每一个数值都是从一个概率分布中随机得到，如果满足下列条件：</p>
      <li>均值u是与时间t无关的常数；</li>
      <li>方差是与时间t无关的常数；</li>
      <li>协方差rk是只与时间间隔K有关，与时间t无关的常数；</li>
      <li>则称该随机时间序列是平稳的，而该随机过程是平稳随机过程。</li>
      <br>

      <h4 id="2.8.2">2.8.2 ADF思路</h4>
      <p>白噪声的过程是：Xt=wt,wt(0,σ2)</p>
      <p><img style="margin-left: 60px" src="../assets/气温预测平台/7.png"></p>
      <p>对于白噪声序列，基本是在均值附近较为平均的随机震荡。它满足正态分布，均值与方差都是与时间t无关的函数，它满足平稳性要求。</p>
      <p>随机游走的过程是：Xt=Xt−1+wt,Xt(0,tσ2)</p>
      <p>对于随机游走，可以看到比白噪声平滑很多，并且呈现出一些“趋势性”的感觉。它的均值为0，方差与时间t有关，他不满足平稳性要求。</p>
      <p>而随机游走的一阶差分是平稳的： △Xt=Xt−Xt−1=wt,UtN(0,σ2)</p>
      <p>如果一个时间序列是非平稳的，它常常可以通过取差分的方法而形成平稳序列。</p>
      <p>ADF 大致的思想就是基于随机游走的，对Xt回归，如果发现p=1，说明序列满足随机游走，就是非平稳的。</p>
      <p>下图是通过spsspro软件生成：</p>
      <p><img style="margin-left: 60px" src="../assets/气温预测平台/8.jpeg"></p>
      <br>

      <h4 id="2.8.3">2.8.3 如何确定该序列是否平稳呢？</h4>
      <p>（1）临界值检验</p>
      <p>临界值1%、5%、10%不同程度拒绝原假设的统计值和假设检验值t进行比较，t同时小于1%、5%、10%即说明非常好地拒绝该假设</p>
      <p>（2）显著性检验p&lt;0.05</p>
      <p>本数据中，原序列的 ADF 假设检验值t为1.814， 大于三个level的统计值，所以是非平稳的。而一阶差分序列的 ADF 假设检验值t为-3.156，小于三个level的统计值，再来看显著性p的值为0.023&lt;0.05，所以是平稳的。</p>
      <p>经过二阶差分，与一阶差分相比，只是在显著性程度上扩大了，因此对于该序列，采用一阶差分比较合适。一般情况下，采用一阶、二阶差分就可以使序列变得平稳。</p>
      <br>

      <h3 id="2.9">2.9 ARIMA模型确定p、q值</h3>
      <ol>
        <li>p 值可从偏自相关系数（PACF）图的最大滞后点来大致判断，q 值可从自相关系数（ACF）图的最大滞后点来大致判断</li>
        <li>遍历搜索AIC和BIC最小的参数组合</li>
      </ol>

      <h4 id="2.9.1">2.9.1 拖尾和截尾</h4>
      <p>拖尾，顾名思义，就是序列缓慢衰减，“尾巴”慢慢拖着滑下来，或者震荡衰减</p>
      <p>而截尾则是突然截断了，像个悬崖，指序列从某个时点变得非常小</p>
      <p>专业点来说呢，就是：</p>
      <p>如果样本自相关系数和样本偏自相关系数在最初的阶明显大于2倍标准差（下图虚线），而后几乎95%的系数都落在2倍标准差的范围内，且非零系数衰减为小值波动的过程非常突然，通常视为k阶截尾。</p>
      <p>如果有超过5%的样本相关系数大于2倍标准差，或者非零系数衰减为小值波动的过程比较缓慢或连续，通常视为拖尾。</p>
      <br>

      <h4 id="2.9.2">2.9.2 自相关系数（ACF）</h4>
      <p>ACF(k)=Σt=k+1n(Zt−Z¯)(Zt−k−Z¯)Σt=1n(Zt−Z¯)2</p>
      <p>自相关系数度量的是同一事件在两个不同时期之间的相关程度，形象的讲就是度量自己过去的行为对自己现在的影响。在这里可以通过自相关系数（ACF）图的最大滞后点来大致判断q 值。</p>
      <p>偏自相关系数（PACF）</p>
      <p><img style="margin-left: 50px" src="../assets/气温预测平台/9.png"></p>
      <p>计算某一个要素对另一个要素的影响或相关程度时，把其他要素的影响视为常数，即暂不考虑其他要素的影响，而单独研究那两个要素之间的相互关系的密切程度时，称为偏相关。在这里可以通过偏自相关系数（PACF）图的最大滞后点来大致判断p 值。</p>
      <p>下图是通过spsspro软件生成：</p>
      <p><img style="margin-left: 50px" src="../assets/气温预测平台/10.jpeg"></p>
      <p style="margin-left: 350px">差分数据自相关图（ACF）</p>
      <p><img style="margin-left: 50px" src="../assets/气温预测平台/11.png"></p>
      <p style="margin-left: 350px">差分数据偏自相关图（PACF）</p>
      <p>从上图可以看到：趋势序列 ACF 有 1 阶截尾，PACF 有 1 阶截尾尾。因此可以选 p=1， q=1。</p>
      <p>通过拖尾和截尾对模型定阶，具有很强的主观性。</p>
      <br>

      <h4 id="2.9.3">2.9.3 AIC、BIC准则</h4>
      <p>AIC 准则全称是最小化信息量准则</p>
      <p>AIC=−2ln(L)+2K，其中 L 表示模型的极大似然函数， K 表示模型参数个数。</p>
      <p>当样本容量很大时，采用BIC贝叶斯信息准则</p>
      <p>BIC=−2ln(L)+Kln(n) ，其中 n 表示样本容量。</p>
      <p>通过比较不同差分阶数的AIC、BIC的值，取两者最小值p、q</p>
      <br>

      <h3 id="2.10">2.10 拟合ARIMA模型(p,d,q)</h3>
      <p>由上述步骤，我们已知d、p、q，得到拟合模型为ARIMA（q,d,q）</p>
      <p>采用多元线性回归，得到ARIMA原始公式</p>
      <br>

      <h3 id="2.11">2.11 对天气数据进行预测</h3>
      <p>使用该公式，即可得到未来的天气数据</p>
      <br>

      <h2 id="3">3 网站开发概述</h2>
      <h3 id="3.1">3.1 为何选择Web网站</h3>
      <p>胖客户端——桌面端</p>
      <li>需要安装，可移植性差</li>
      <li>开发成本高，开发周期长</li>
      <li>扩展应用难，可维护性差</li>
      <li>....</li>
      <p>但在Web诞生以前，这些都不是很明显的问题</p>
      <p><img style="margin-left: 50px" src="../assets/气温预测平台/12.png"></p>
      <p>瘦客户端——Web页面</p>
      <li>开发快</li>
      <li>只要有浏览器就能打开——手机、电脑...</li>
      <li>经过多年的积淀，拥有十分丰富的开源资料库——element UI、EChart.....</li>
      <li>......</li>
      <p><img style="margin-left: 50px" src="../assets/气温预测平台/13.png"></p>
      <br>

      <h3 id="3.2">3.2 Web网站运行原理</h3>
      <h4 id="3.2.1">3.2.1 Web网站架构</h4>
      <p><img style="margin-left: 100px" src="../assets/气温预测平台/14.png"></p>
      <p style="margin-left: 250px">浏览器-服务机架构（B/S架构）</p>
      <p>Web服务器</p>
      <li>Web程序运行所在地</li>
      <li>持续运行并暴露接口，等待被浏览器访问</li>
      <li>被访问后，将Web页面传送给浏览器</li>
      <p>客户机（浏览器）</p>
      <li>从互联网中接收网页</li>
      <p>数据库服务器</p>
      <li>运行数据库管理系统，存储Web所需数据</li>
      <p>浏览器-服务机架构（B/S架构）——一种特殊的客户-服务（C/S）架构</p>
      <br>

      <h4 id="3.2.2">3.2.2 Web网站运行流程</h4>
      <p>具体运行流程如下图所示。我们在输入框输入网址时，也称做域名、URL（Uniform Resource Locator，统一资源定位器）。输入完毕后，敲击回车，URL会通过DNS服务器解析为对应的IP地址。在计算机网络中，浏览器通过IP地址，找到对应的Web服务器，并访问对应的Web程序。</p>
      <p>一个域名，通常分为主域名和子域名。主域名用于进行DNS解析，得出Web程序所在Web服务器的IP地址；而子域名通常作为路由，定位Web程序暴露的对应接口。如下图所示，cas.bjtu.edu.cn/auth/login作为一个域名，由主域名cas.bjtu.edu.cn和子域名/auth/login组成。当通过IP地址访问到对应的Web程序后，浏览器通过子域名，也就是路由/auth/login，访问对应暴露的接口。</p>
      <p>Web程序的接口通常会引用业务逻辑，处理相应数据，并给予访问者以反馈。在图中，浏览器访问接口后，接口返回给浏览器一张html网页。浏览器接收网页后，将网页呈现在浏览器中。</p>
      <p><img style="margin-left: 30px" src="../assets/气温预测平台/15.png"></p>
      <p style="margin-left: 350px">Web网站运行流程</p>
      <br>

      <h3 id="3.3">3.3 Web应用框架</h3>
      <p>定义</p>
      <li>高度集成的库和组件的集合</li>
      <li>包含Web程序运行的必要组件，容易扩展</li>
      <li>用来进行快速开发</li>
      <p>框架列举</p>
      <li>桌面端框架：QT、MFC....</li>
      <li>服务端框架：django、springboot、Flask...</li>
      <li>客户端框架：Vue.js....</li>
      <br>

      <h3 id="3.4">3.4 前后端分离</h3>
      <p>作为一个C/S架构的系统来说，客户端和服务端通常是两个独立运行的程序，之间通过网络进行通信。下图以移动端和服务端的通信系统为例。移动端程序包含图形界面及必要的运行逻辑，在需要数据时，向服务端请求数据。服务端在获得请求后，通过业务逻辑处理数据并传递给移动端。移动端程序将数据通过图形界面展示给用户。</p>
      <p><img style="margin-left: 30px" src="../assets/气温预测平台/16.png"></p>
      <p style="margin-left: 350px">移动端-服务端通信示意图</p>
      <p>而作为一个B/S架构的系统来说，与服务端直接沟通的是浏览器。在前面的阐述中我们说过，浏览器本身并不包含网站的图形界面，而是通过请求Web服务器中的Web程序，返回html页面并呈现在浏览器中的。Web程序的接口既可以响应html页面，同时可以响应数据。</p>
      <p>这样的架构存在一定的问题，数据和html页面同时由服务端进行传递，使得html页面的开发和服务端业务逻辑的开发存在较大的耦合性，不利于前后端工程师的分工合作。</p>
      <p><img style="margin-left: 30px" src="../assets/气温预测平台/17.png"></p>
      <p style="margin-left: 350px">浏览器-服务端通信示意图</p>
      <p>因此，为了解决这一问题，减少html页面和业务逻辑开发相互掣肘的可能性，在Web系统架构上，出现了一种前后端分离的架构模式，如下图所示。与浏览器沟通并响应html页面，专注于图形界面渲染的程序，称作Web客户端程序，也就是我们俗称的“前端”。而与浏览器沟通并响应数据，专注于业务逻辑和数据处理的程序，称作Web服务端程序，也就是我们俗称的“后端”。客户端程序和服务端程序通过接口进行数据沟通，流程与移动端-服务端模式相同。</p>
      <p>这样的架构模式，让前后端工程师可以更加注重自己领域的开发工作，而不必过多顾及不必要的领域，增加了开发效率。</p>
      <p><img style="margin-left: 30px" src="../assets/气温预测平台/18.png"></p>
      <p style="margin-left: 350px">前后端分离通信示意图</p>
      <br>

      <h3 id="3.5">3.5 框架推荐</h3>
      <h4 id="3.5.1">3.5.1 Django</h4>
      <li>Python，服务端框架</li>
      <li>拥有强大的数据库组件</li>
      <li>自带强大的web后台页面</li>
      <p>缺点：框架庞大过于笨重，在处理高并发上略有欠缺</p>
      <p>推荐IDE：Jetbrain Pycharm</p>
      <p><img style="margin-left: 300px" src="../assets/气温预测平台/19.png"></p>
      <br>

      <h4 id="3.5.2">3.5.2 Flask</h4>
      <li>Python，服务端框架</li>
      <li>简单易学，开发维护都很容易，适合小型项目快速开发</li>
      <li> 轻量级框架，自带库很小，可根据需要扩展</li>
      <li> 架构没有严格格式，根据开发者的需要来</li>
      <p>缺点：框架本身的内容少，过分依赖第三方库，对于大型项目的处理能力有限</p>
      <p>推荐IDE：Jetbrain Pycharm</p>
      <p><img style="margin-left: 300px" src="../assets/气温预测平台/20.png"></p>
      <br>

      <h4 id="3.5.3">3.5.3 SpringBoot</h4>
      <li>Java，服务端框架</li>
      <li>准生产级别的框架，组件丰富，适合中大型项目</li>
      <li>开发简单易行，效率高</li>
      <li>部署方便，适合微服务架构</li>
      <p>缺点：学习成本高，底层高度封装报错不容易定位</p>
      <p>推荐IDE：Jetbrain IntelliJ IDEA</p>
      <p><img style="margin-left: 300px" src="../assets/气温预测平台/21.png"></p>
      <br>

      <h4 id="3.5.4">3.5.4 Vue.js</h4>
      <li>html+js+css，前端框架</li>
      <li>拥有丰富的素材库和社区，很容易做出精美的页面</li>
      <li>集成度高，尤其是使用vue-cil后，开发过程十分流畅</li>
      <li>简单易学，快速开发</li>
      <p>缺点：依赖第三方库和社区维护，框架发挥能力几乎完全取决于第三方（目前来讲不是明显的缺点）</p>
      <p>推荐IDE：Jetbrain WebStorm</p>
      <p><img style="margin-left: 300px" src="../assets/气温预测平台/22.png"></p>
      <br>

    </el-main>

    <el-aside class="elAside">
      <div style="margin:0 0 0 120px;font-size:18px;font-weight:bold;">目录</div>
      <el-tabs @tab-click="handleClick" v-model="activeName" :tab-position="tabPosition" style="height: auto;">
        <el-tab-pane :name="'tab'+index"
                     :class="item.lev"
                     v-for="(item, index) in navList"
                     :key="index"
                     :label="item.name"></el-tab-pane>
      </el-tabs>
    </el-aside>
  </div>
</template>

<script>
import CodeCompile from "@/components/CodeCompile";

export default {
  name: "CourseStudy",
  components:{CodeCompile},
  data(){
    return{
      activeName:'tab0',
      tabPosition:'right',
      scroll: '',
      navList: [],
    }
  },
  methods: {
    handleClick(tab/*,event*/){
      this.jump(tab.index)
    },
    dataScroll: function () {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    },
    jump(index) {
      let jump = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      // 获取需要滚动的距离
      let total = jump[index].offsetTop - 30;
      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },
    loadScroll: function () {
      let self = this;
      // let navs = document.querySelectorAll('.el-tabs__item');
      // var sections = document.getElementsByClassName('section');
      for (let i = self.navList.length - 1; i >= 0; i--) {
        if (self.scroll >= self.navList[i].offsetTop - 120) {
          self.activeName = 'tab'+i
          break;
        }
      }
    },
    selectAllTitle(){
      let title = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      this.navList = Array.from(title);
      this.navList.forEach(item=>{
        item.name = item.innerHTML
      })
      this.navList.forEach(el => {
        let index = el.localName.indexOf('h');
        el.lev = 'lev'+el.localName.substring(index+1,el.localName.length)
      });

    }
  },
  watch: {
    scroll: function () {
      this.loadScroll()
    }
  },
  mounted() {
    // scroll代表滚动条距离页面顶部距离
    window.addEventListener('scroll', this.dataScroll);
    this.selectAllTitle();
    this.$nextTick(() => {
      setTimeout(() => {
        let navs = document.querySelectorAll('.el-tabs__item');
        for(let i=navs.length-1;i>=0;i--){
          // console.log($('#'+navs[i].id))
          // 从lev1到lev5分别添加不同到样式
          document.querySelector('#'+navs[i].id).style.padding="0";
          if(this.navList[i].lev=='lev1'){
            document.querySelector('#'+navs[i].id).style.paddingLeft="20px" ;
          }else if(this.navList[i].lev=='lev2'){
            document.querySelector('#'+navs[i].id).style.paddingLeft="35px" ;
          }else if(this.navList[i].lev=='lev3'){
            document.querySelector('#'+navs[i].id).style.paddingLeft="50px" ;
          }else if(this.navList[i].lev=='lev4'){
            document.querySelector('#'+navs[i].id).style.paddingLeft="65px" ;
            document.querySelector('#'+navs[i].id).style.fontWeight="400" ;
          }else if(this.navList[i].lev=='lev5'){
            document.querySelector('#'+navs[i].id).style.paddingLeft="80px" ;
            document.querySelector('#'+navs[i].id).style.fontWeight="400" ;
          }
        }
      });

    })
  }
}
</script>
<style lang="scss" >

.elMain{
  width:900px;
}
.el-tabs__header.is-right{
  height: 500px;// !important;
}
.elAside{
  position: fixed;
  top: 80px;
  right: 30px;
  width: 100px;
  height: 80%;
}
.icon-sources-wrapper.wrapper .el-tabs__nav.is-right{
  box-sizing: content-box;// !important;
}
</style>
