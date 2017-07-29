// (function () {
	var cur_level,
		answers,
		total_correct_answers,
		total_wrong_answers,
		max_chances,
		highest_scored,
		correct_answers,
		time_hide_cells,
		game_over;

	function init() {
		cur_level = 2;
		answers = [];

		total_correct_answers = 0;
		total_wrong_answers = 0;
		max_chances = 3;
		highest_scored = 0;

		correct_answers = 0;
		time_hide_cells = 1000;

		game_over = false;
	}

	$('.start_game').on('click', function() {
		init();
		start_game();
	});

	function start_game() {
		draw_table();
		create_problem();
		animate_active_cells();
		display_scores();
	}

	function draw_table() {
		var html = '<table class="game_table">';

		for (var i = 0; i < cur_level; i++) {
			html += '<tr class="each_row">';

			for (var j = 0; j < cur_level; j++) {
				html += '<td class="each_cell"></td>';
			}

			html += '</tr>';
		}

		html += '</table>';

		$('.area').html(html);

	}

	function create_problem() {
		answers = [];
		correct_answers = 0;
		var modder = cur_level * cur_level;

		while (answers.length != cur_level) {
			var cur_index = parseInt(Math.random() * 10000, 10) % modder;

			if (answers.indexOf(cur_index) == -1) {
				answers.push(cur_index);
			}

		}
	}

	function show_active_tiles() {
		var all_cells = $('.each_cell');

		for (var i = 0; i < answers.length; i++){
			$(all_cells[answers[i]]).addClass('active_cell');
			$(all_cells[answers[i]]).data('valid', 'valid');
		}
	}

	function hide_active_tiles() {
		$('.active_cell').removeClass('active_cell');
	}

	function animate_active_cells() {
		show_active_tiles();
		setTimeout(hide_active_tiles, time_hide_cells);

		display_scores();
		$('.btn_hint').removeAttr('disabled');
	}

	$('.btn_hint').on('click', function() {
		animate_active_cells();
		correct_answers = 0;
		$(this).attr('disabled', 'disabled');
	});

	$('.area').on('click', '.each_cell', function() {
		if (game_over) {
			return;
		}

		if ($(this).data('valid') != 'valid') {
			// FAIL!
			total_wrong_answers++;
			$(this).addClass('wrong_cell');
			show_active_tiles();


			if (total_wrong_answers < max_chances) {
				cur_level = cur_level > 2 ? cur_level - 1 : 2;
				setTimeout(start_game, 1500);
			} else {
				display_scores();
				game_over = true;
				alert("Game Over!");
			}

		} else if (!$(this).hasClass('active_cell')) {
			$(this).addClass('active_cell');
			correct_answers++;

			if (correct_answers == cur_level) {
				highest_scored = cur_level > highest_scored ? cur_level : highest_scored;
				cur_level++;
				start_game();
			}
		}
	});

	function display_scores() {
		$('.level').text(cur_level);
		$('.highest_scored').text(highest_scored);

		var wrongs = '';
		for (var i = 0; i < total_wrong_answers; i++) {
			wrongs += 'x ';
		}

		$('.wrong').text(wrongs);
	}

// })();
