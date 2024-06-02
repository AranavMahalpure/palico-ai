import { useContext, useMemo } from "react";
import { LabContext } from "./lab.context";
import { LabExperimentTestResult } from "@palico-ai/common";

export const useTestCase = (testCaseId: string) => {
  const { testCases, setTestCases, runTestCase } = useContext(LabContext);
  const testCase = useMemo(
    () => testCases.find((tc) => tc.id === testCaseId),
    [testCases, testCaseId]
  );

  const handleChangeTestCaseLabel = (label: string) => {
    setTestCases((currentTestCases) =>
      currentTestCases.map((tc) =>
        tc.id === testCaseId ? { ...tc, label } : tc
      )
    );
  }

  const handleChangeTestCaseUserMessage = (userMessage: string) => {
    setTestCases((currentTestCases) =>
      currentTestCases.map((tc) =>
        tc.id === testCaseId ? { ...tc, userMessage } : tc
      )
    );
  }

  const handleChangeRequestPayload = (payload?: string) => {
    setTestCases((currentTestCases) =>
      currentTestCases.map((tc) =>
        tc.id === testCaseId ? { ...tc, payloadString: payload } : tc
      )
    );
  }

  const handleRemoveTestCase = () => {
    setTestCases((currentTestCases) =>
      currentTestCases.filter((tc) => tc.id !== testCaseId)
    );
  }

  const handleChangeMetrics = (metrics: string[]) => {
    setTestCases((currentTestCases) =>
      currentTestCases.map((tc) =>
        tc.id === testCaseId ? { ...tc, metrics } : tc
      )
    );
  }

  return {
    testCase,
    handleChangeTestCaseLabel,
    handleChangeTestCaseUserMessage,
    handleChangeRequestPayload,
    handleChangeMetrics,
    handleRemoveTestCase,
    runTests: () => {
      runTestCase(testCaseId);
    },
  };
};

export const useExperiment = (experimentId: string) => {
  const { experiments, baselineExperimentId, setBaselineExperimentId, setExperiments, runExperiment } = useContext(LabContext);
  const experiment = useMemo(
    () => experiments.find((exp) => exp.id === experimentId),
    [experiments, experimentId]
  );

  const handleChangeExperimentLabel = (label: string) => {
    setExperiments((currentExperiments) =>
      currentExperiments.map((exp) =>
        exp.id === experimentId ? { ...exp, label } : exp
      )
    );
  }

  const handleChangeExperimentAgent = (agentId: string) => {
    setExperiments((currentExperiments) =>
      currentExperiments.map((exp) =>
        exp.id === experimentId ? { ...exp, agentId } : exp
      )
    );
  }

  const handleChangeExperimentFeatureFlag = (featureFlagJSON?: string) => {
    setExperiments((currentExperiments) =>
      currentExperiments.map((exp) =>
        exp.id === experimentId ? { ...exp, featureFlagJSON } : exp
      )
    );
  }

  const handleRemoveExperiment = () => {
    setExperiments((currentExperiments) =>
      currentExperiments.filter((exp) => exp.id !== experimentId)
    );
  }

  return {
    experiment,
    baselineExperimentId,
    setBaselineExperimentId,
    handleChangeExperimentLabel,
    handleChangeExperimentAgent,
    handleChangeExperimentFeatureFlag,
    handleRemoveExperiment,
    runTests: () => {
      runExperiment(experimentId);
    },
  };
}

export type UseTestResultReturn = {
  result?: LabExperimentTestResult;
  runTest: () => void;
};

export const useExpTestResult = (
  experimentId: string,
  testCaseId: string
): UseTestResultReturn => {
  const { experimentTestResults, runExperimentTest } = useContext(
    LabContext
  );
  return {
    result: experimentTestResults[experimentId]?.[testCaseId],
    runTest: () => {
      runExperimentTest(experimentId, testCaseId);
    },
  };
};

export const useBaselineTestResult = (testCaseId: string) => {
  const { baselineExperimentId, experimentTestResults } = useContext(LabContext);
  console.log(baselineExperimentId)
  if(!baselineExperimentId) {
    return
  }
  return experimentTestResults[baselineExperimentId]?.[testCaseId]
}