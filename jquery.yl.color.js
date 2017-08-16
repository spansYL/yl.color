/**
 * 简单的颜色选择器
 * @author yl
 * @time 2017/08/15
 */
/************************ 参数介绍 ***************************/
// containerId: (string) 弹框容器id
// left: (int)距离触发按钮左边距离
// top: (int)距离触发元素顶部距离
// defaultColor: (string)默认颜色
// customColor: (array)自定义颜色
// format: (array)标准色

;(function($){
    $.fn.ylColor = function(options){
        var defaults = {
            containerId: 'ylColor',
            left: 50,
            top: 0,
            defaultColor: '#000'
        };
        defaults.customColor = [
            '#fff','#000','#eeece1','#1f497d','#4f81bd',
            '#c0504d','#9bbb59','#8064a2','#4bacc6','#f79646',
            '#f2f2f2','#808080','#ddd9c3','#c6d9f1','#dce6f2',
            '#f2dcdb','#ebf1de','#e6e0ec','#dbeef4','#fdeada',
            '#d9d9d9','#595959','#c4bd97','#8eb4e3','#b9cde5',
            '#e6b9b8','#d7e4bd','#ccc1da','#b7dee8','#fcd5b5',
            '#bfbfbf','#404040','#948a54','#558ed5','#95b3d7',
            '#d99694','#c3d69b','#b3a2c7','#93cddd','#fac090',
            '#a6a6a6','#262626','#4a452a','#17375e','#376092',
            '#953735','#77933c','#604a7b','#31859c','#e46c0a',
            '#7f7f7f','#0d0d0d','#1e1c11','#10243f','#254061',
            '#632523','#4f6228','#403152','#215968','#984807'
        ];
        defaults.formatColor = [
            '#c00000','#ff0000','#ffc000','#ffff00','#92d050',
            '#00b050','#00b0f0','#0070c0','#002060','#7030a0'
        ];

        var settings = $.extend(defaults,options);
        var elems = this;
        var cur_elem;

        var event = function(){
            $(elems).each(function(){
                $(this).click(function(){
                    show(this);
                });
            });
            $('#' + settings.containerId).find('.aCol').click(function(){
                onSelect(this);
            });
        };
        var build = function(){
            var containerId = settings.containerId;
            var containerDiv = $('<div id="'+ containerId+'" class="ylColor" style="display: none"></div>');
            var defaultDiv = $('<div class="ylColor-default"></div>');
            var customDiv = $('<div class="ylColor-custom"></div>');
            var formatDiv = $('<div class="ylColor-format"></div>');

            defaultDiv.append('<span class="aCol" style="background-color: '+ settings.defaultColor +'" title="'+settings.defaultColor +'"></span>自动');
            var liHtml = '';
            $.each(settings.customColor,function(i,e){
                liHtml += '<li class="aCol" data-color="'+e+'" style="background-color: '+ e +'" title="'+ e +'"></li>';
            });
            customDiv.append('<div class="title">主题颜色</div><ul>'+liHtml+'</ul>');

            liHtml = '';
            $.each(settings.formatColor,function(i,e){
                liHtml += '<li class="aCol" data-color="'+e+'" style="background-color: '+e+'" title="'+ e +'"></li>';
            });
            customDiv.append('<div class="title">标准色</div><ul>'+liHtml+'</ul>');

            if($('#' + containerId).length == 0){
                //不存在，则创建
                $('body').append(containerDiv);
            }
            containerDiv.append(defaultDiv,customDiv,formatDiv);

        }
        var show = function(elem){
            cur_elem = elem;
            var top = $(elem).offset().top;
            var left = $(elem).offset().left;
            $('#' + settings.containerId).css({
                top: top + settings.top,
                left: left + settings.left,
            }).fadeIn();
        };
        var onSelect = function(selectOne){
            $('#'+ settings.containerId).fadeOut();
            if(options.onSelect){
                options.onSelect(selectOne,cur_elem);
            }
        };

        build();
        event();
    };
})(jQuery);
