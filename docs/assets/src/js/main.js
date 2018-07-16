(($) => {
  skel.breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)",
    xxsmall: "(max-width: 360px)"
  });

  $(() => {
    const $window = $(window);
    const $body = $("body");
    const $wrapper = $("#wrapper");

    // Disable animations/transitions until the page has loaded.
    $body.addClass("is-loading");

    $window.on("load", () => {
      window.setTimeout(() => $body.removeClass("is-loading"), 100);
    });

    // Fix: Placeholder polyfill.
    $("form").placeholder();

    // Prioritize "important" elements on medium.
    skel.on("+medium -medium", () => {
      $.prioritize(
        ".important\\28 medium\\29",
        skel.breakpoint("medium").active
      );
    });

    // Browser fixes.

    // IE: Flexbox min-height bug.
    if (skel.vars.browser == "ie") {
      (() => {
        let flexboxFixTimeoutId;

        $window
          .on("resize.flexbox-fix", () => {
            const $x = $(".fullscreen");

            clearTimeout(flexboxFixTimeoutId);

            flexboxFixTimeoutId = setTimeout(() => {
              if ($x.prop("scrollHeight") > $window.height())
                $x.css("height", "auto");
              else $x.css("height", "100vh");
            }, 250);
          })
          .triggerHandler("resize.flexbox-fix");
      })();
    }

    // Object fit workaround.
    if (!skel.canUse("object-fit")) {
      (() => {
        $(".banner .image, .spotlight .image").each(() => {
          const $this = $(this);
          const $img = $this.children("img");
          const positionClass = $this
              .parent()
              .attr("class")
              .match(/image-position-([a-z]+)/);

          // Set image.
          $this
            .css("background-image", `url("${$img.attr("src")}")`)
            .css("background-repeat", "no-repeat")
            .css("background-size", "cover");

          // Set position.
          switch (positionClass.length > 1 ? positionClass[1] : "") {
            case "left":
              $this.css("background-position", "left");
              break;

            case "right":
              $this.css("background-position", "right");
              break;

            default:
            case "center":
              $this.css("background-position", "center");
              break;
          }

          // Hide original.
          $img.css("opacity", "0");
        });
      })();
    }

    // Smooth scroll.
    $(".smooth-scroll").scrolly();
    $(".smooth-scroll-middle").scrolly({ anchor: "middle" });

    // Wrapper.
    $wrapper.children().scrollex({
      top: "30vh",
      bottom: "30vh",
      initialize: () => {
        $(this).addClass("is-inactive");
      },
      terminate: () => {
        $(this).removeClass("is-inactive");
      },
      enter: () => {
        $(this).removeClass("is-inactive");
      },
      leave: () => {
        var $this = $(this);

        if ($this.hasClass("onscroll-bidirectional"))
          $this.addClass("is-inactive");
      }
    });

    // Items.
    $(".items")
      .scrollex({
        top: "30vh",
        bottom: "30vh",
        delay: 50,
        initialize: () => {
          $(this).addClass("is-inactive");
        },
        terminate: () => {
          $(this).removeClass("is-inactive");
        },
        enter: () => {
          $(this).removeClass("is-inactive");
        },
        leave: () => {
          var $this = $(this);

          if ($this.hasClass("onscroll-bidirectional"))
            $this.addClass("is-inactive");
        }
      })
      .children()
      .wrapInner('<div class="inner"></div>');

    // Gallery.
    $(".gallery")
      .wrapInner('<div class="inner"></div>')
      .prepend(
        skel.vars.mobile
          ? ""
          : '<div class="forward"></div><div class="backward"></div>'
      )
      .scrollex({
        top: "30vh",
        bottom: "30vh",
        delay: 50,
        initialize: () => {
          $(this).addClass("is-inactive");
        },
        terminate: () => {
          $(this).removeClass("is-inactive");
        },
        enter: () => {
          $(this).removeClass("is-inactive");
        },
        leave: () => {
          const $this = $(this);

          if ($this.hasClass("onscroll-bidirectional"))
            $this.addClass("is-inactive");
        }
      })
      .children(".inner")
      //.css('overflow', 'hidden')
      .css("overflow-y", skel.vars.mobile ? "visible" : "hidden")
      .css("overflow-x", skel.vars.mobile ? "scroll" : "hidden")
      .scrollLeft(0);

    // Style #1.
    // ...

    // Style #2.
    $(".gallery")
      .on("wheel", ".inner", (event) => {
        const $this = $(this);
        const delta = event.originalEvent.deltaX * 10;

        // Cap delta.
        if (delta > 0) {
          delta = Math.min(25, delta);
        } else if (delta < 0) {
          delta = Math.max(-25, delta);
        }

        // Scroll.
        $this.scrollLeft($this.scrollLeft() + delta);
      })
      .on("mouseenter", ".forward, .backward", () => {
        const $this = $(this);
        const $inner = $this.siblings(".inner");
        const direction = $this.hasClass("forward") ? 1 : -1;

        // Clear move interval.
        clearInterval(this._gallery_moveIntervalId);

        // Start interval.
        this._gallery_moveIntervalId = setInterval(() => {
          $inner.scrollLeft($inner.scrollLeft() + 5 * direction);
        }, 10);
      })
      .on("mouseleave", ".forward, .backward", () => {
        // Clear move interval.
        clearInterval(this._gallery_moveIntervalId);
      });

    // Lightbox.
    $(".gallery.lightbox")
      .on("click", "a", (event) => {
        const $a = $(this);
        const $gallery = $a.parents(".gallery");
        const $modal = $gallery.children(".modal");
        const $modalImg = $modal.find("img");
        const href = $a.attr("href");

        // Not an image? Bail.
        if (!href.match(/\.(jpg|gif|png|mp4)$/)) {
          return;
        }

        // Prevent default.
        event.preventDefault();
        event.stopPropagation();

        // Locked? Bail.
        if ($modal[0]._locked) {
          return;
        }

        // Lock.
        $modal[0]._locked = true;

        // Set src.
        $modalImg.attr("src", href);

        // Set visible.
        $modal.addClass("visible");

        // Focus.
        $modal.focus();

        // Delay.
        setTimeout(() => {
          // Unlock.
          $modal[0]._locked = false;
        }, 600);
      })
      .on("click", ".modal", () => {
        const $modal = $(this);
        const $modalImg = $modal.find("img");

        // Locked? Bail.
        if ($modal[0]._locked) return;

        // Already hidden? Bail.
        if (!$modal.hasClass("visible")) return;

        // Lock.
        $modal[0]._locked = true;

        // Clear visible, loaded.
        $modal.removeClass("loaded");

        // Delay.
        setTimeout(() => {
          $modal.removeClass("visible");

          setTimeout(() => {
            // Clear src.
            $modalImg.attr("src", "");

            // Unlock.
            $modal[0]._locked = false;

            // Focus.
            $body.focus();
          }, 475);
        }, 125);
      })
      .on("keypress", ".modal", (event) => {
        const $modal = $(this);

        // Escape? Hide modal.
        if (event.keyCode == 27) $modal.trigger("click");
      })
      .prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
      .find("img")
      .on("load", () => {
        const $modalImg = $(this);
        const $modal = $modalImg.parents(".modal");

        setTimeout(() => {
          // No longer visible? Bail.
          if (!$modal.hasClass("visible")) return;

          // Set loaded.
          $modal.addClass("loaded");
        }, 275);
      });
  });
})(jQuery);
