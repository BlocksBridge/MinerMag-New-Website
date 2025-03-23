export default function Disclaimer() {
  let privacyPolicy = `Last updated: 23 March 2025, <br> \n The stock prices displayed on this website are provided as a convenience and are updated on a delayed basis, approximately every 2 hours. We do not guarantee the accuracy, completeness, or timeliness of this information. This service is not intended to provide financial advice, and we disclaim any liability for decisions made based on the stock prices presented here. Users are solely responsible for their investment decisions and should consult with a financial professional and utilize real-time data feeds.`;

  return (
    <div className="w-8/12 flex flex-col justify-center items-center gap-2 m-auto my-7">
      <h1 className="font-bold text-lg">Disclaimer</h1>
      <p
        className="font-thin text-md "
        dangerouslySetInnerHTML={{
          __html: String(privacyPolicy).replaceAll(". ", "<br/><br/>"),
        }}></p>
    </div>
  );
}
