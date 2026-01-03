import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getReview } from "../features/review/reviewSlice";


export const ReviewPage = () => {
  const [code, setCode] = useState("");
  const { data, loading, error } = useAppSelector((s) => s.review);
  const dispatch = useAppDispatch();

    const handleClick = () => {
        if(!code.trim()) return;
        dispatch(getReview({code}));
    }
  return (
    <div className="flex gap-1.5 max-w-full">
      <Editor
       value={code}
       onChange={(value) => setCode(value ?? "") }
        height="95vh"
        defaultValue="// paste your code or write"
        width="50%"
        theme="light"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        className="border-r-2"
      />

      <div className="flex w-[50%] flex-col gap-3  items-center mt-3.5 ">
        <p className="text-2xl font-poppins">AI Code Review</p>
        <button
         onClick={handleClick}
         disabled={loading}
         className="bg-black text-white w-50  py-2 cursor-pointer hover:text-black hover:bg-white hover:outline-1 rounded-2xl text-lg font-gsans">
          {loading ? "Reviewing..." : "Review"}
        </button>
         {error && (
          <p>{error}</p>
         )}

         {data && (
          <>
            <section>
              <h3>Summary: </h3>
              <p>{data.aiOutput.summary}</p>
            </section>

            {data.aiOutput.bugs.length > 0 && (
              <section>
                <h3>Bugs: </h3>
                {data.aiOutput.bugs.map((bug, i) => (
                  <div key={i}>
                    <p>Severity: {bug.severity}</p>
                    <p>Issue: {bug.issue}</p>
                    <p>Why : {bug.why}</p>
                    <pre>
                      {bug.fix}
                    </pre>
                  </div>
                ))}
              </section>
            )}

            {data.aiOutput.improvements.length > 0 && (
              <section>
                <h3>Improvements</h3>
                <ul>
                  {data.aiOutput.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </section>
            )}
     
            {data.aiOutput.securityIssues.length > 0 && (
              <section>
                <h3>Security Issue</h3>
                <ul>
                  {data.aiOutput.securityIssues.map((sec, i) => (
                    <li key={i}>{sec}</li>
                  ))}
                </ul>
              </section>
            )}
          </>
         )}
      </div>

    </div>
  );
};
