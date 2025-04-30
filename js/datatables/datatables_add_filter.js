// This is not working as expected, search works ok though (this is example code too)
function datatables_add_filter(table_id) {
    var table   = $("#" + table_id);
    var headers = $("#" + table_id + " thead tr")

    // Change the headers to filters
    headers.clone(true)
        .addClass('filters')
        .appendTo("#" + table_id + " thead");
    // Add filter logic to keypresses
    table.DataTable({
        dom: 'lrt',
        info: false,
        orderCellsTop: true,
        fixedHeader: true,
        paging: false,
        fixedHeader: {
            header: true,
            footer: true
        },
        initComplete: function () {
            var api = this.api();
 
            // For each column
            api
                .columns()
                .eq(0)
                .each(function (colIdx) {
                    // Set the header cell to contain the input element
                    var cell = $('#' + table_id +' .filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    var title = $(cell).text();
                    $(cell).html('<input class="column_search text_control" type="text" placeholder="' + title + '" />');
 
                    // On every keypress in this input
                    $(
                        'input',
                        $('#' + table_id + ' .filters th').eq($(api.column(colIdx).header()).index())
                    )
                        .off('keyup change')
                        .on('change', function (e) {
                            // Get the search value
                            $(this).attr('title', $(this).val());
                            var regexr = '({search})'; //$(this).parents('th').find('select').val();
 
                            let cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api
                                .column(colIdx)
                                .search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '(((' + this.value + ')))')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                )
                                .draw();
                        })
                        .on('keyup', function (e) {
                            e.stopPropagation();
                            cursorPosition = this.selectionStart;
 
                            $(this).trigger('change');
                            $(this)
                                .focus()[0]
                                .setSelectionRange(cursorPosition, cursorPosition);
                        });
                });
           },

    });
}