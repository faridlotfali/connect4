class Connect4 {
    constructor(selector){
        this.rows = 6;
        this.cols = 7;
        this.selector = selector;
        this.player = 'red';
        this.Gameover = false;
        this.onPlayerMove = function(){};
        this.createGrid();
        this.setupEventListener();
    }

    createGrid(){
        const $borad = $(this.selector);
        // console.log($borad);
        $borad.empty();
        this.Gameover =false;
        this.player = 'red';
        for (let row = 0; row < this.rows; row++) {
            const $row = $('<div>').addClass('row');
            $borad.append($row);
            for (let col = 0; col < this.cols; col++) {
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col',col)
                    .attr('data-row',row);
                $row.append($col)
            }
            $borad.append($row)
        }
    }

    setupEventListener(){
        const $borad = $(this.selector);
        const that = this;
        function findLastEmptyCell(col){
            const cells = $(`.col[data-col='${col}']`);
            for (let i = cells.length-1; i>=0; i--) {
                const $cell = $(cells[i]);
                if($cell.hasClass('empty')){
                    return $cell;
                }                
            }
            return null;
        }

        $borad.on('mouseenter','.col.empty',function(){
            if(that.Gameover) return;
            const col = $(this).data('col')
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);
        });

        $borad.on('mouseleave','.col',function(){
            $('.col').removeClass(`next-${that.player}`);
        });
        
        $borad.on('click','.col.empty',function(){
            if(that.Gameover) return;
            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data('player',that.player)

            const winner =that.checkForWinner($lastEmptyCell.data('row'),$lastEmptyCell.data('col'));
            if(winner){
                that.Gameover = true;
                alert(`Game over! Player ${that.player} has won!`);
                // $('.col.empty').removeClass('empty');
                return;
            }
            that.player = (that.player === 'red') ? 'yellow' : 'red';
            that.onPlayerMove();
            $(this).trigger('mouseenter');
        });
    }
    checkForWinner(row,col){
        const that = this;
        function $getcell(i,j){
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }

        function checkDirectiion(direction){
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $next = $getcell(i,j);
            while(i >=0 &&
                i < that.rows &&
                j >=0 &&
                j < that.cols &&
                $next.data('player') === that.player
            ){
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getcell(i,j)
            }
            return total;
        }

        function checkWin(a,b){
            const total = 1 +
                checkDirectiion(a)+
                checkDirectiion(b);
            if(total >= 4){
                console.log(total);
                return that.player;
            }else{
                return null;
            }
        }

        function checkForTRtoBL(){
            return checkWin({i:1 , j:-1},{i: 1 , j:1})
        }

        function checkForTLtoBR(){
            return checkWin({i:1 , j:1},{i: -1 , j:-1})
        }

        function checkForVerticals(){
            return checkWin({i:-1 , j:0},{i: 1 , j:0})
        }
             
        function checkForHorizontals(){
            return checkWin({i:0 , j:-1},{i: 0 , j:1})
        }

        return checkForVerticals() || checkForHorizontals()
            || checkForTLtoBR() || checkForTRtoBL();
    }

    restart(){
        this.createGrid();
        this.onPlayerMove();
    }
}