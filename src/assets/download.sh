#!/bin/bash

NUMBER=(
  https://loopinfosol.in/themeforest/ekka-html-v32/ekka-html/assets/images/brand-image/1.png
  https://loopinfosol.in/themeforest/ekka-html-v32/ekka-html/assets/images/brand-image/2.png
  https://loopinfosol.in/themeforest/ekka-html-v32/ekka-html/assets/images/brand-image/3.png
  https://loopinfosol.in/themeforest/ekka-html-v32/ekka-html/assets/images/brand-image/4.png
  https://loopinfosol.in/themeforest/ekka-html-v32/ekka-html/assets/images/brand-image/5.png
  https://loopinfosol.in/themeforest/ekka-html-v32/ekka-html/assets/images/brand-image/6.png
  https://loopinfosol.in/themeforest/ekka-html-v32/ekka-html/assets/images/brand-image/7.png
)

for N in ${NUMBER[@]};do
    wget --no-proxy $N -P /home/hassanafaraji/programming/projects/vitrineshahre/front/src/assets/image/brand/
done 


