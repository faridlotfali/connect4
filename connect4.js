class Connect4 {
    constructor(selector){
        this.rows = 6;
        this.cols = 7;
        this.selector = selector;
        this.player = 'red';
        this.createGrid();
        this.setupEventListener();
    }

    createGrid(){
        const $borad = $(this.selector);
        // console.log($borad);
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
            const col = $(this).data('col')
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);
        })

        $borad.on('mouseleave','.col',function(){
            $('.col').removeClass(`next-${that.player}`);
        });
        
        $borad.on('click','.col',function(){
            const col = $(this).data('col');
            const row = $(this).data('row');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass('empty');
            $lastEmptyCell.addClass(that.player);

            const winner =that.checkForWinner(row,col)
            that.player = (that.player === 'red') ? 'yellow' : 'red';
            $(this).trigger('mouseenter');
        });
    }
    checkForWinner(row,col){
        console.log("hi");
    }
}