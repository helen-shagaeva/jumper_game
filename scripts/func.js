var b_keyPressed = false; //������ �� � ������ ������ �������

/**
 *��������� ���� �������
 *� ���������� ������� �� JQuery'�����
 *��� JQuery ��� mobile
 */
function getKeyCode(event) {
    var e = event || window.event;
    return keyCode = e.which || e.KeyCode;
}

/**
 *���������� ������ � ������ ������
 *��������������
 */
function getWinSize() {
    var sizes = {myWidth:'0',myHeight:'0'};
    if (typeof( window.innerWidth ) == 'number') {

        //�� IE
        sizes.myWidth = window.innerWidth;
        sizes.myHeight = window.innerHeight;
    } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {

        //IE 6+
        sizes.myWidth = document.documentElement.clientWidth;
        sizes.myHeight = document.documentElement.clientHeight;
    } else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {

        //IE 4
        sizes.myWidth = document.body.clientWidth;
        sizes.myHeight = document.body.clientHeight;
    }
    return sizes;
}

/**
 *���������� ���������� ����
 *��������������
 */
function mouseShowHandler(event) {
    var e = event || window.event;
    var mouseXY = {'x':'0','y':'0'};

    if (e.pageX == null && e.clientX != null) {
        var html = document.documentElement
        var body = document.body

        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }

    mouseXY.x = e.pageX
    mouseXY.y = e.pageY
    return mouseXY;
}


/**
 *���������� ��������� �� �������� (������)
 *�������������� ��� �� ����� ��� :)
 */

function addElement() {
    var ni = document.getElementById('myDiv');
    var numi = document.getElementById('theValue');
    var num = (document.getElementById('theValue').value - 1) + 2;
    numi.value = num;
    var newdiv = document.createElement('div');
    var divIdName = 'my' + num + 'Div';
    newdiv.setAttribute('id', divIdName);
    newdiv.innerHTML = 'Element Number ' + num + ' has been added! <a href=\'#\' onclick=\'removeElement(' + divIdName + ')\'>Remove the div "' + divIdName + '"</a>';
    ni.appendChild(newdiv);
}

/**
 *�������� �������� �� �������� �� ������������ ��������
 *�������������� ��� �� ����� ��� :)
 */
function removeElement(id) {
    var el;
    return (el = document.getElementById(id)).parentNode.removeChild(el);
}