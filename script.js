const grid = document.getElementById("hadithGrid");

hadiths.forEach((h) => {
  const card = document.createElement("article");
  card.className = "hadith-card";

  const previewLength = 100;
  const isLong = h.text.length > previewLength;
  const previewText = isLong ? h.text.slice(0, previewLength) + "..." : h.text;

  card.innerHTML = `
    <blockquote class="hadith-text">
      <span class="hadith-preview">${previewText}</span>
      ${
        isLong
          ? `<span class="hadith-full" style="display:none;">${h.text}</span>`
          : ""
      }
    </blockquote>
    <div class="hadith-meta">
      <p><span class="bold">خلاصة حكم المحدث:</span> 
        <span class="judgment-badge ${
          h.ruling.includes("صحيح")
            ? "judgment-sahih"
            : h.ruling.includes("حسن")
            ? "judgment-hasan"
            : "judgment-daif"
        }">${h.ruling}</span>
      </p>
      <p><span class="bold">الراوي:</span> ${h.narrator}</p>
      <p><span class="bold">المحدث:</span> ${h.compiler}</p>
      <p><span class="bold">المصدر:</span> ${h.source}</p>
      <p><span class="bold">رابط:</span> <a href="${
        h.dorar_source
      }" target="_blank" rel="noopener noreferrer">الحديث موقع الدرر السنية</a></p>
      <button class="copy-btn" style="margin-top:0.5rem; cursor:pointer;">نسخ الحديث</button>
      ${
        isLong
          ? `<button class="toggle-hadith" style="margin-top:0.5rem; cursor:pointer;">عرض الحديث كاملًا</button>`
          : ""
      }
    </div>
  `;
  grid.appendChild(card);
});

const hadithPopup = document.querySelector("#hadithPopup");
const closeBtn = document.querySelector("closePopupBtn");

document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const hadithText = btn
      .closest(".hadith-card")
      .querySelector("blockquote")
      .querySelector(".hadith-full").innerText;
    navigator.clipboard.writeText(hadithText).then(() => {
      const popup = document.getElementById("copyPopup");
      popup.classList.add("show");
      setTimeout(() => popup.classList.remove("show"), 2000);
    });
  });
});

document.querySelectorAll(".toggle-hadith").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Lock page
    document.body.classList.add("body-lock");

    const card = btn.closest(".hadith-card");
    const text =
      card.querySelector(".hadith-full")?.innerText ||
      card.querySelector(".hadith-preview").innerText;
    const narrator = card
      .querySelector(".hadith-meta p:nth-child(2)")
      .innerText.replace("الراوي:", "")
      .trim();
    const compiler = card
      .querySelector(".hadith-meta p:nth-child(3)")
      .innerText.replace("المحدث:", "")
      .trim();
    const source = card
      .querySelector(".hadith-meta p:nth-child(4)")
      .innerText.replace("المصدر:", "")
      .trim();

    document.getElementById("popupHadith").innerText = text;
    document.getElementById(
      "popupReference"
    ).innerText = `رواه ${narrator}, ${compiler}, ${source}`;

    hadithPopup.style.display = "flex";
  });
});

// Close popup btn
document.getElementById("closePopupBtn").addEventListener("click", () => {
  // Unlock page
  document.body.classList.remove("body-lock");

  hadithPopup.style.display = "none";
});

hadithPopup.addEventListener("click", (e) => {
  if (e.target === hadithPopup) {
    // Unlock page
    document.body.classList.remove("body-lock");

    hadithPopup.style.display = "none";
  }
});
