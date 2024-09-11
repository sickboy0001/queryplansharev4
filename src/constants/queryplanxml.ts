export const SQLPlanCondition = {
  Disp: {
    GridStatementsAttributes: [
      { name: "StatementType", displayname: "" },
      { name: "StatementSubTreeCost", displayname: "" },
      { name: "StatementEstRows", displayname: "" },
      { name: "StatementOptmEarlyAbortReason", displayname: "" },
    ],
    GridReplAttributes: [
      { name: "PhysicalOp", displayname: "" },
      { name: "EstimateRows", displayname: "" },
      { name: "EstimateIO", displayname: "" },
      { name: "EstimateCPU", displayname: "" },
      { name: "AvgRowSize", displayname: "" },
      { name: "EstimatedTotalSubtreeCost", displayname: "SubtreeCost" },
      { name: "Parallel", displayname: "" },
      { name: "EstimateRebinds", displayname: "E-Rebinds" },
      { name: "EstimateRewinds", displayname: "E-Rewinds" },
    ],
  },
  Statements: {
    Attributes: [
      "StatementText",
      "StatementId",
      "StatementCompId",
      "StatementType",
      "StatementSubTreeCost",
      "StatementEstRows",
      "StatementOptmLevel",
      "QueryHash",
      "QueryPlanHash",
      "StatementOptmEarlyAbortReason",
      "StatementSetOptions-QUOTED_IDENTIFIER",
      "StatementSetOptions-ARITHABORT",
      "StatementSetOptions-CONCAT_NULL_YIELDS_NULL",
      "StatementSetOptions-ANSI_NULLS",
      "StatementSetOptions-ANSI_PADDING",
      "StatementSetOptions-ANSI_WARNINGS",
      "StatementSetOptions-NUMERIC_ROUNDABORT",
      "QueryPlan-CachedPlanSize",
      "QueryPlan-CompileTime",
      "QueryPlan-CompileCPU",
      "QueryPlan-CompileMemory",
    ],
  },
  QueryPlan: "QueryPlan",
  QueryPlanInfos: [
    {
      NodeName: "MemoryGrantInfo",
      Attributes: [
        "SerialRequiredMemory",
        "SerialDesiredMemory",
        "GrantedMemory",
        "MaxUsedMemory",
      ],
    },
    {
      NodeName: "OptimizerHardwareDependentProperties",
      Attributes: [
        "EstimatedAvailableMemoryGrant",
        "EstimatedPagesCached",
        "EstimatedAvailableDegreeOfParallelism",
        "MaxCompileMemory",
      ],
    },
    {
      NodeName: "OptimizerStatsUsage",
      ListNodeName: "StatisticsInfo",
      Attributes: [
        "Table",
        "Statistics",
        "ModificationCount",
        "SamplingPercent",
        "LastUpdate",
      ],
    },
    {
      NodeName: "WaitStats",
      ListNodeName: "Wait",
      Attributes: ["WaitType", "WaitTimeMs", "WaitCount"],
    },
    {
      NodeName: "QueryTimeStats",
      Attributes: ["CpuTime", "ElapsedTime"],
    },
  ],
  Repl: {
    Condition: {
      Attribute: "NodeId",
    },
    Attributes: [
      "NodeId",
      "PhysicalOp",
      "LogicalOp",
      "EstimateRows",
      "EstimateIO",
      "EstimateCPU",
      "AvgRowSize",
      "EstimatedTotalSubtreeCost",
      "Parallel",
      "EstimateRebinds",
      "EstimateRewinds",
    ],
    ChildNodes: ["OutputList", "MemoryFractions"],
    Operation: [
      "NestedLoops",
      "Sort",
      "ComputeScalar",
      "StreamAggregate",
      "Filter",
      "Segment",
      "SequenceProject",
      "Assert",
      "Concat",
    ],
    Subinfos: [
      {
        Id: "OutputList",
        Name: "OutputList",
        NodeCondition: "OutputList",
        ToText: ["ColumnReference--Database,Schema,Table,Alias,Column"],
      },
      {
        Id: "Object",
        Name: "Object",
        NodeCondition: "*->Object",
        // <Object Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Index="[clst]" Alias="[o]" IndexKind="Clustered" Storage="RowStore" />
        ToText: ["Database,Schema,Table,Index,Alias,IndexKind,Storage"],
      },
      {
        Id: "SeekPredicates",
        Name: "SeekPredicates",
        NodeCondition: "*->SeekPredicates",
        // <SeekPredicates>
        // <SeekPredicateNew>
        // <SeekKeys>
        //   <Prefix ScanType="EQ">
        //     <RangeColumns>
        //       <ColumnReference Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="depid" />
        ToText: [
          "ColumnReference--Database,Schema,Table,Alias,Column",
          "ScalarOperator--ScalarString",
        ],
      },
      {
        Id: "Predicate",
        Name: "Predicate",
        NodeCondition: "*->Predicate",
        ToText: ["ScalarOperator--ScalarString"],
      },
      {
        Id: "OuterReferences",
        Name: "OuterReferences",
        NodeCondition: "*->OuterReferences",
        ToText: ["ColumnReference--Database,Schema,Table,Alias,Column"],
      },
      {
        Id: "OrderBy",
        Name: "OrderBy",
        NodeCondition: "*->OrderBy",
        ToText: ["ColumnReference--Database,Schema,Table,Alias,Column"],
      },
    ],
    DispAttributeNames: ["ScalarString", "ConstValue", "Ascending", "ScanType"],
  },
};
