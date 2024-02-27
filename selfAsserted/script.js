"use strict";
      $(document).ready(function() {
        console.log(
          "Hide the continue button until the user has verified their e-mail"
        );

        function setUpHeader(text) {
          var intro = document.querySelector(".intro");
          if (intro) {
            intro.innerHTML = "<h2 aria-level='2'>" + text + "</h2>";
            intro.style.display = "block";
          }
        }

        function setUpIntroText(text) {
          var intro = document.querySelector("#email_intro");
          if (intro) {
            intro.innerHTML = text;
          }
        }

        function changeLabel(id, text) {
          var label = document.querySelector(id);
          if (label) {
            label.innerHTML = text;
          }
        }

        // Password reset flow
        // First screen
        // #email_ver_but_send - Send verification code button
        var readonlyEmailInput = document.querySelector("#email_ver_but_send");
        if (readonlyEmailInput) {
          console.log(
              "Password reset flow - first screen"
          );

          setUpHeader("Reset your password");
          setUpIntroText("Enter your email address to reset your password. You will receive a verification code on the given address.")
          changeLabel("#email_label", "E-mail");

          // Hide the help link
          var helpLinks = document.getElementsByClassName('helplink');
          if (helpLinks) {
            document.getElementsByClassName('helpLink')[0].style.display = 'none';
          }
        }

        // Setup for first page
        var readonlyEmailInput = document.querySelector("#email_ver_but_send");
        if (readonlyEmailInput) {
          // Attach header
          setUpHeader("Set up your password");

          // Hide the help link
          var helpLinks = document.getElementsByClassName('helplink');
          if (helpLinks) {
            document.getElementsByClassName('helpLink')[0].style.display = 'none';
          }
        }

        // Setup for second page
        var verifyCodeBtn = document.querySelector("#email_ver_but_verify");
        var readonlyVerifyCodeBtn = document.querySelector(
          "#readonlyEmail_ver_but_verify"
        );
        if (verifyCodeBtn || readonlyVerifyCodeBtn) {
          document.getElementById("continue").style.display = "none";
        }
        $("#email").closest('.attrEntry').children('.error').attr("id", "emailError");
        $("#email").insertBefore("#emailError");

        const emailInput = document.getElementById("email");
        const emailLabel = document.getElementById('email_label');

        if (emailInput && emailLabel) {
          emailInput.addEventListener("focus", () => {
            emailLabel.classList.add("input-focused");
          });
          emailInput.addEventListener("blur", () => {
            if (emailInput.value == '') {
              emailLabel.classList.remove("input-focused");
            }
          });  
        }

        const newPasswordLabel = document.querySelector('label[for="newPassword"]');
        if (newPasswordLabel) {
          newPasswordLabel.style.display = "none";
          newPasswordLabel.classList.add("input-focused");
        }

        const reenterPasswordLabel = document.querySelector('label[for="reenterPassword"]');
        if (reenterPasswordLabel) {
          reenterPasswordLabel.style.display = "none";
          reenterPasswordLabel.classList.add("input-focused");
        }

        const newPasswordInput = document.getElementById("newPassword");
        const reenterPasswordInput = document.getElementById("reenterPassword");

        if (newPasswordInput && reenterPasswordInput && newPasswordLabel && reenterPasswordLabel) {
          $("#newPassword").attr("placeholder", "Enter new password");
          newPasswordInput.parentNode.classList.add("entry-item");
          newPasswordInput.parentNode.classList.remove('attrEntry');

          newPasswordInput.addEventListener("focus", () => {
            newPasswordLabel.style.display = "inline";
            $("#newPassword").attr("placeholder", "");
          });
          newPasswordInput.addEventListener("blur", () => {
            if (newPasswordInput.value == '') {
              newPasswordLabel.style.display = "none";
              $("#newPassword").attr("placeholder", "Enter new password");
            }
          });

          $("#reenterPassword").attr("placeholder", "Confirm New Password");
          reenterPasswordInput.parentNode.classList.add("entry-item");
          reenterPasswordInput.parentNode.classList.remove('attrEntry');

          reenterPasswordInput.addEventListener("focus", () => {
            reenterPasswordLabel.style.display = "inline";
            $("#reenterPassword").attr("placeholder", "");
          });
          reenterPasswordInput.addEventListener("blur", () => {
            if (reenterPasswordInput.value == '') {
              reenterPasswordLabel.style.display = "none";
              $("#reenterPassword").attr("placeholder", "Confirm New Password");
            }
          });
        }

        const createObserver = (name, onVisible, onHidden) => {
          let MutationObserver =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;

          let elem = document.getElementById(name);

          if (!!elem) {
            let observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                if (mutation.type == "attributes") {
                  if (mutation.target.getAttribute("aria-hidden") == "true") {
                    if (!!onHidden) {
                      onHidden();
                    }
                  } else {
                    onVisible();
                  }
                }
              });
            });
            observer.observe(elem, {
              attributes: true,
              attributeFilter: ["aria-hidden"],
            });
            return observer;
          }
          return undefined;
        };

        const inputReadonlyEmailObserver = createObserver(
          "readonlyEmail_intro",
          () => {
            document.getElementById("continue").style.display = "none";
          }
        );

        const inputEmailObserver = createObserver("email_intro", () => {
          document.getElementById("continue").style.display = "none";
        });

        const verifyReadonlyCodeObserver = createObserver(
          "readonlyEmail_info",
          () => {
            document.getElementById("continue").style.display = "none";
            document.getElementById("readonlyEmail").disabled = true;
          }
        );

        const verifyCodeObserver = createObserver("email_info", () => {
          document.getElementById("continue").style.display = "none";
          document.getElementById("email").disabled = true;
        });

        const verificationReadonlySuccessObserver = createObserver(
          "readonlyEmail_success",
          () => {
            document.getElementById("continue").style.display = "inline";

            // There's a pointless page that shows up after you've verified your e-mail
            //   so to avoid the confusion, continue is clicked for the user, taking them
            //   to the password reset page
            document.getElementById("continue").click();
          }
        );
        
        const verificationSuccessObserver = createObserver(
          "email_success",
          () => {
            document.getElementById("email_ver_but_edit").style.display = "none";
            document.getElementById("continue").style.display = "inline";

            // There's a pointless page that shows up after you've verified your e-mail
            //   so to avoid the confusion, continue is clicked for the user, taking them
            //   to the password reset page
            document.getElementById("continue").click();
          }
        );

        const passwordSetupIntroObserver = createObserver(
          "readonlyEmail_intro",
          () => {
            // pasword setup page
            const passwordSetupLabel = document.getElementById('readonlyEmail_intro');
            if (passwordSetupLabel) {
              // hide the help link
              var helpLinks = document.getElementsByClassName('helplink');
              if (helpLinks) {
                document.getElementsByClassName('helpLink')[0].style.display = 'none';
              }

              // change the label text
              passwordSetupLabel.innerHTML = 'Enter your email address to create your password. You will receive a verification code on the given address.';
            }
          }
        );

        const passwordSetupInfoObserver = createObserver(
          "readonlyEmail_info",
          () => {
            // pasword setup page
            const passwordSetupLabel = document.getElementById('readonlyEmail_info');
            if (passwordSetupLabel) {
              // hide the help link
              var helpLinks = document.getElementsByClassName('helplink');
              if (helpLinks.style.display == 'block') {
                document.getElementsByClassName('helpLink')[0].style.display = 'none';
              }

              // change the label text
              passwordSetupLabel.innerHTML = 'Enter your email address to create your password. You will receive a verification code on the given address.';
            }
          }
        );

      });