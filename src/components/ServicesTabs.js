'use client'
import { useState } from 'react'


function cleanHtml(html) {
  if (!html) return ''

  return html
    .replace(/data-[^=]+="[^"]*"/g, '')
    .replace(/class=""/g, '')
    .replace(/\s+/g, ' ') // remove extra spaces
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

export default function ServicesTabs({ data }) {
  const [active, setActive] = useState(0)
  const tabs = data.tabs || []

  return (
    <section className="bg-[#111111] text-white py-24">
      <div className="section-inner">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="section-heading text-white">Services</h2>
              <div className="flex flex-wrap gap-3">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`abnjun-tab-button ${active === index ? 'active' : ''}`}
                  >
                    <img src={tab.icon} alt={tab.title} className="h-10 w-10 object-contain" />
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-slate-200">
              <h3 className="text-3xl font-semibold mb-4 text-white">{tabs[active]?.title}</h3>
              <div className="text-slate-300 leading-8" dangerouslySetInnerHTML={{ __html: cleanHtml(tabs[active]?.content) }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}