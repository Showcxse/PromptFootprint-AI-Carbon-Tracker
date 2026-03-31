import React from 'react'

const PrivacyPolicy = () => {
  return (
    <>
    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Last updated: March 31, 2026
          </p>
          <p className="leading-relaxed">
            This Privacy Notice for <strong>PromptFootprint</strong> describes how and why we might access, collect, store, use, and/or share your information when you use our services, including when you visit our website at <a href="https://promptfootprint.vercel.app/" className="text-primary-green hover:underline">https://promptfootprint.vercel.app/</a> or engage with our experimental AI/LLM carbon tracking tool.
          </p>
          <p className="leading-relaxed">
            <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:showcxse@zohomail.com" className="text-primary-green hover:underline">showcxse@zohomail.com</a>.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-8">1. What Information Do We Collect?</h2>
          <p className="leading-relaxed">
            <strong>In Short:</strong> We do not collect any Personally Identifiable Information (PII). We only collect anonymous, aggregated usage statistics.
          </p>
          <p className="leading-relaxed">
            <strong>Zero Personal Data Collection:</strong> All AI prompt tokenization is performed locally within your browser. The text of your prompts is never transmitted to our servers, saved, or analyzed by third parties.
          </p>
          <p className="leading-relaxed">
            <strong>Anonymous Usage Data:</strong> The only data transmitted from your device is anonymous mathematical integers (e.g., prompt token count, estimated carbon output, and estimated miles driven). This data is completely decoupled from your identity, IP address, or location, and is used strictly to calculate global community statistics.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-8">2. How Do We Process Your Information?</h2>
          <p className="leading-relaxed">
            <strong>In Short:</strong> We process anonymous integers strictly to display cumulative, global usage trends.
          </p>
          <p className="leading-relaxed">
            We utilize third-party infrastructure (Google Firebase) to host our global database. The anonymous statistical data transmitted to this database is used exclusively to update the "Live Community Impact" dashboard visible on the website.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-8">3. When and With Whom Do We Share Information?</h2>
          <p className="leading-relaxed">
            <strong>In Short:</strong> We do not sell, rent, or trade any user information.
          </p>
          <p className="leading-relaxed">
            Because we do not collect personal data, we have no personal data to share. We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose, and we will not do so in the future.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-8">4. How Long Do We Keep Your Information?</h2>
          <p className="leading-relaxed">
            The anonymous, aggregated statistical data (total tokens processed globally, total emissions tracked) is retained indefinitely as a core function of the application's cumulative community tracking features.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-8">5. Controls for Do-Not-Track Features</h2>
          <p className="leading-relaxed">
            Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. Because our application does not track users, utilize tracking cookies, or collect personal data, we natively respect your privacy regardless of DNT browser signals.
          </p>
          <h2 className="text-2xl font-bold dark:text-white mt-8">6. Contact Us</h2>
          <p className="leading-relaxed">
            If you have questions or comments about this notice, you may contact the developer:
          </p>
          <div className="bg-primary-white/10 dark:bg-zinc-800/50 p-6 rounded-2xl border border-primary-dark/10 dark:border-white/10 inline-block">
            <p className="font-bold dark:text-white">Casey</p>
            <p className="text-sm">PromptFootprint Developer</p>
            <p className="text-sm">United States</p>
            <a href="mailto:showcxse@zohomail.com" className="text-primary-green hover:underline mt-2 block">
              showcxse@zohomail.com
            </a>
          </div>
    </>
  )
}

export default PrivacyPolicy