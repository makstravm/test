$(function () {
  $.getJSON('data.json', function (data) {
    $(function () {

      let countries = $('#countries').attr('name')
      let visa = $('#visa').attr('name')
      let arrivals = $('#arrivals').attr('name')
      let timespent = $('#timespent').attr('name')

      data[countries].map(t => {
        let option = `<option id="${t.id}">${t.name}</option>`;
        $(option).appendTo("#countries");
      })

      data[visa].map(t => {
        let option = `<option id="${t.id}" ">${t.name}</option>`;
        $(option).appendTo("#visa");
      })

      let sumRender = () => {
        let visaPrise;
        let arrivalsPrise;
        let timespentPrise;
        let filterCountriesId

        $("#countries option:selected").each(function () {
          filterCountriesId = this.id;
        })

        $("#visa option:selected").each(function () {
          let foundId = this.id
          data[visa].filter(f => {
            if (f.id === foundId) {
              visaPrise = parseFloat(f.price.replace(/\s/g, "").replace(",", "."))
            }
          })
          return visaPrise
        })

        $("#arrivals option:selected").each(function () {
          let foundId = this.id
          data[arrivals].filter(f => {
            if (f.id === foundId && f.relative === filterCountriesId) {
              arrivalsPrise = parseFloat(f.price.replace(/\s/g, "").replace(",", "."))
            }
          })
          return arrivalsPrise
        })

        $("#timespent option:selected").each(function () {
          let foundId = this.id
          data[timespent].filter(f => {
            if (f.id === foundId && f.relative === filterCountriesId) {
              timespentPrise = parseFloat(f.price.replace(/\s/g, "").replace(",", "."))
            }
          })
          return timespentPrise
        })

        let sum = visaPrise + arrivalsPrise + timespentPrise

        $('.price').text(sum)
      }

      $('#visa,#arrivals,#timespent').on('change', function () {
        sumRender()
      })

      $('#countries').on('change', function () {
        change()
        sumRender()
      })

      let change = () => {
        $("#countries option:selected").each(function () {
          let filterCountriesId = this.id;
          filterListArrivals(data[arrivals], filterCountriesId)
          filterListTimespent(data[timespent], filterCountriesId)
        })
      }

      let filterListArrivals = (data, filter) => {
        $('#arrivals').children().remove()
        data.map(t => {
          if (t.relative === filter) {
            let option = `<option id="${t.id}">${t.name}</option>`;
            $(option).appendTo("#arrivals");
          }
        })
        $('#arrivals').trigger('refresh');
      }

      let filterListTimespent = (data, filter) => {
        $('#timespent').children().remove()
        data.map(t => {
          if (t.relative === filter) {
            let option = `<option id="${t.id}">${t.name}</option>`;
            $(option).appendTo("#timespent");
          }
        })
        $('#timespent').trigger('refresh');
      }

      change()
      sumRender()
      $('select').styler();
    })
  })
})
