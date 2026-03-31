import React from "react";

const Terms = () => {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 dark:text-white">
        Terms and Conditions
      </h1>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
        Last updated: March 31, 2026
      </p>
      <h2 className="text-2xl font-bold dark:text-white mt-8">
        1. Agreement to Terms
      </h2>
      <p className="leading-relaxed">
        These Legal Terms constitute a legally binding agreement made between
        you and I (the developer), concerning your access
        to and use of the{" "}
        <a
          href="https://promptfootprint.vercel.app"
          className="text-primary-green hover:underline"
        >
          PromptFootprint
        </a>{" "}
        website.
      </p>
      <p className="leading-relaxed">
        We provide an experimental tool to track the estimated carbon output of
        AI/LLM prompts strictly for{" "}
        <strong>informational and educational purposes</strong>. By accessing
        the Services, you agree that you have read, understood, and agreed to be
        bound by all of these Legal Terms.
      </p>
      <h2 className="text-2xl font-bold dark:text-white mt-8">
        2. Intellectual Property Rights
      </h2>
      <p className="leading-relaxed">
        We are the owner or licensee of all intellectual property rights in our
        Services, including source code, databases, functionality, software, and
        website designs. The Content and Marks are provided "AS IS" for your
        personal, non-commercial use. You may not systematically retrieve data
        or other content from the Services to create or compile a collection,
        database, or directory without written permission from us.
      </p>
      <h2 className="text-2xl font-bold dark:text-white mt-8">
        3. Prohibited Activities
      </h2>
      <p className="leading-relaxed">
        As a user of the Services, you agree not to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
        <li>
          Interfere with, disrupt, or create an undue burden on the Services or
          the networks connected to the Services.
        </li>
        <li>
          Engage in any automated use of the system, such as using scripts to
          send comments or utilizing data mining, robots, or extraction tools.
        </li>
        <li>
          Attempt to bypass any measures of the Services designed to prevent or
          restrict access.
        </li>
        <li>
          Use the Services as part of any effort to compete with us or for any
          revenue-generating endeavor.
        </li>
      </ul>
      <h2 className="text-2xl font-bold dark:text-white mt-8">
        4. Third-Party Websites and APIs
      </h2>
      <p className="leading-relaxed">
        The Services contain links to and utilize data from Third-Party Websites
        and APIs (such as grid intensity metrics). Such Third-Party Content is
        not monitored or checked for accuracy by us, and we are not responsible
        for any inaccuracies, downtime, or unreliability of third-party data
        providers.
      </p>
      <h2 className="text-2xl font-bold dark:text-white mt-8">5. Disclaimer</h2>
      <p className="leading-relaxed font-bold uppercase tracking-wide text-xs">
        The services are provided on an as-is and as-available basis.
      </p>
      <p className="leading-relaxed">
        You agree that your use of the services will be at your sole risk. To
        the fullest extent permitted by law, we disclaim all warranties, express
        or implied, in connection with the services and your use thereof. We
        make no warranties or representations about the accuracy or completeness
        of the services' content or third-party API data, and we will assume no
        liability or responsibility for any errors, mistakes, or inaccuracies of
        calculations provided by this experimental tool.
      </p>
      <h2 className="text-2xl font-bold dark:text-white mt-8">
        6. Limitations of Liability
      </h2>
      <p className="leading-relaxed">
        In no event will we be liable to you or any third party for any direct,
        indirect, consequential, exemplary, incidental, special, or punitive
        damages, including lost profit, lost revenue, loss of data, or other
        damages arising from your use of the services, even if we have been
        advised of the possibility of such damages.
      </p>
      <h2 className="text-2xl font-bold dark:text-white mt-8">
        7. Dispute Resolution & Governing Law
      </h2>
      <p className="leading-relaxed">
        These Legal Terms and your use of the Services are governed by and
        construed in accordance with the laws of the State of Hawaii. To
        expedite resolution and control the cost of any dispute, the Parties
        agree to first attempt to negotiate any Dispute informally for at least
        30 days. If the Parties are unable to resolve a Dispute through informal
        negotiations, the Dispute will be finally and exclusively resolved by
        binding arbitration.
      </p>
      <h2 className="text-2xl font-bold dark:text-white mt-8">8. Contact Us</h2>
      <p className="leading-relaxed">
        In order to resolve a complaint regarding the Services or to receive
        further information regarding use of the Services, please contact us at:
      </p>
      <div className="bg-primary-white/10 dark:bg-zinc-800/50 p-6 rounded-2xl border border-primary-dark/10 dark:border-white/10 inline-block">
        <p className="font-bold dark:text-white">Casey</p>
        <p className="text-sm">PromptFootprint Developer</p>
        <p className="text-sm">United States</p>
        <a
          href="mailto:showcxse@zohomail.com"
          className="text-primary-green hover:underline mt-2 block"
        >
          showcxse@zohomail.com
        </a>
      </div>
    </>
  );
};

export default Terms;
