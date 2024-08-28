"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const PageTest1QPS = () => {
  const [queryPlanXml, setQueryPlanXml] = useState<string>("");
  const [QP, setQP] = useState<any>(null);

  useEffect(() => {
    // スクリプトを動的に読み込む
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/dist/js/qp/qp.js";
        script.type = "text/javascript";
        script.onload = () => resolve(window.QP);
        script.onerror = () => reject(new Error("Failed to load script"));
        document.head.appendChild(script);
      });
    };

    // スタイルシートも同様に読み込む
    const loadStylesheet = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "/dist/css/qp/qp.css";
      document.head.appendChild(link);
    };

    loadStylesheet();
    loadScript()
      .then((QP) => {
        setQP(QP);
      })
      .catch((error) => {
        console.error(error);
      });

    // クリーンアップ処理
    return () => {
      const script = document.querySelector(`script[src="/dist/js/qp/qp.js"]`);
      if (script) {
        document.head.removeChild(script);
      }
      const link = document.querySelector(`link[href="/dist/css/qp/qp.css"]`);
      if (link) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleClick = () => {
    console.log("handleClick:start");
    const container = document.getElementById("container");
    console.log(QP);

    if (typeof QP !== "undefined") {
      QP.showPlan(container, xmlsample);
    }
  };
  return (
    <div className="grid w-full gap-2">
      <Button onClick={handleClick}>Send message</Button>

      <div id="container"></div>
    </div>
  );
};

export default PageTest1QPS;

const xmlsample = `<?xml version="1.0" encoding="utf-16"?>
<ShowPlanXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" Version="1.564" Build="16.0.1000.6" xmlns="http://schemas.microsoft.com/sqlserver/2004/07/showplan">
  <BatchSequence>
    <Batch>
      <Statements>
        <StmtSimple StatementCompId="1" StatementEstRows="3.08851" StatementId="1" StatementOptmLevel="FULL" StatementOptmEarlyAbortReason="GoodEnoughPlanFound" CardinalityEstimationModelVersion="160" StatementSubTreeCost="0.0464185" StatementText="select  * from sys.objects&#xD;&#xA;where type ='U'" StatementType="SELECT" ParameterizedText="(@1 varchar(8000))SELECT * FROM [sys].[objects] WHERE [type]=@1" QueryHash="0xF8682CDFA0BC3F90" QueryPlanHash="0x687628FF435B064C" RetrievedFromCache="false" SecurityPolicyApplied="false">
          <StatementSetOptions ANSI_NULLS="true" ANSI_PADDING="true" ANSI_WARNINGS="true" ARITHABORT="true" CONCAT_NULL_YIELDS_NULL="true" NUMERIC_ROUNDABORT="false" QUOTED_IDENTIFIER="true" />
          <QueryPlan NonParallelPlanReason="MaxDOPSetToOne" CachedPlanSize="56" CompileTime="11" CompileCPU="11" CompileMemory="1232">
            <MemoryGrantInfo SerialRequiredMemory="0" SerialDesiredMemory="0" GrantedMemory="0" MaxUsedMemory="0" />
            <OptimizerHardwareDependentProperties EstimatedAvailableMemoryGrant="288358" EstimatedPagesCached="72089" EstimatedAvailableDegreeOfParallelism="1" MaxCompileMemory="4648336" />
            <OptimizerStatsUsage>
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Statistics="[nc1]" ModificationCount="1" SamplingPercent="100" LastUpdate="2024-08-18T04:31:53.51" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Statistics="[_WA_Sys_00000008_00000022]" ModificationCount="1" SamplingPercent="100" LastUpdate="2024-08-18T12:20:40.38" />
              <StatisticsInfo Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Statistics="[value]" ModificationCount="0" SamplingPercent="100" LastUpdate="2022-10-08T06:30:30.65" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Statistics="[_WA_Sys_00000006_00000022]" ModificationCount="1" SamplingPercent="100" LastUpdate="2024-08-18T12:20:40.37" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Statistics="[nc2]" ModificationCount="1" SamplingPercent="100" LastUpdate="2024-08-18T04:31:53.52" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Statistics="[nc3]" ModificationCount="1" SamplingPercent="100" LastUpdate="2024-08-18T12:20:40.37" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Statistics="[nc1]" ModificationCount="111" SamplingPercent="100" LastUpdate="2009-04-13T12:59:17.25" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Statistics="[clst]" ModificationCount="1" SamplingPercent="100" LastUpdate="2024-08-18T12:20:40.38" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Statistics="[_WA_Sys_00000003_0000004A]" ModificationCount="1" SamplingPercent="100" LastUpdate="2024-08-18T12:20:40.39" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Statistics="[clst]" ModificationCount="111" SamplingPercent="100" LastUpdate="2009-04-13T12:59:17.25" />
              <StatisticsInfo Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Statistics="[cl]" ModificationCount="0" SamplingPercent="100" LastUpdate="2022-10-08T06:28:47.77" />
              <StatisticsInfo Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Statistics="[_WA_Sys_00000001_0000004A]" ModificationCount="1" SamplingPercent="100" LastUpdate="2024-08-18T12:20:40.38" />
            </OptimizerStatsUsage>
            <RelOp AvgRowSize="237" EstimateCPU="1.25784E-05" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="3.08851" LogicalOp="Left Outer Join" NodeId="0" Parallel="false" PhysicalOp="Nested Loops" EstimatedTotalSubtreeCost="0.0464185">
              <OutputList>
                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="name" />
                <ColumnReference Column="Expr1003" />
                <ColumnReference Column="Expr1004" />
                <ColumnReference Column="Expr1007" />
                <ColumnReference Column="Expr1008" />
              </OutputList>
              <NestedLoops Optimized="false">
                <OuterReferences>
                  <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                </OuterReferences>
                <RelOp AvgRowSize="177" EstimateCPU="1.254E-05" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="3.00919" LogicalOp="Left Outer Join" NodeId="1" Parallel="false" PhysicalOp="Nested Loops" EstimatedTotalSubtreeCost="0.0428051">
                  <OutputList>
                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                    <ColumnReference Column="Expr1003" />
                    <ColumnReference Column="Expr1004" />
                    <ColumnReference Column="Expr1007" />
                    <ColumnReference Column="Expr1008" />
                  </OutputList>
                  <NestedLoops Optimized="false">
                    <OuterReferences>
                      <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                    </OuterReferences>
                    <RelOp AvgRowSize="173" EstimateCPU="0.00519068" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="3" LogicalOp="Filter" NodeId="2" Parallel="false" PhysicalOp="Filter" EstimatedTotalSubtreeCost="0.0391933">
                      <OutputList>
                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                        <ColumnReference Column="Expr1003" />
                        <ColumnReference Column="Expr1004" />
                        <ColumnReference Column="Expr1007" />
                        <ColumnReference Column="Expr1008" />
                      </OutputList>
                      <Filter StartupExpression="false">
                        <RelOp AvgRowSize="175" EstimateCPU="0.0002761" EstimateIO="0" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="3" LogicalOp="Compute Scalar" NodeId="3" Parallel="false" PhysicalOp="Compute Scalar" EstimatedTotalSubtreeCost="0.0340026">
                          <OutputList>
                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                            <ColumnReference Column="Expr1003" />
                            <ColumnReference Column="Expr1004" />
                            <ColumnReference Column="Expr1007" />
                            <ColumnReference Column="Expr1008" />
                          </OutputList>
                          <ComputeScalar>
                            <DefinedValues>
                              <DefinedValue>
                                <ColumnReference Column="Expr1003" />
                                <ScalarOperator ScalarString="CONVERT(char(2),CASE WHEN [testdb].[sys].[sysschobjs].[type] as [o].[type]='ET' THEN 'U' ELSE [testdb].[sys].[sysschobjs].[type] as [o].[type] END,0)">
                                  <Convert DataType="char" Length="2" Style="0" Implicit="false">
                                    <ScalarOperator>
                                      <IF>
                                        <Condition>
                                          <ScalarOperator>
                                            <Compare CompareOp="EQ">
                                              <ScalarOperator>
                                                <Identifier>
                                                  <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                                </Identifier>
                                              </ScalarOperator>
                                              <ScalarOperator>
                                                <Const ConstValue="'ET'" />
                                              </ScalarOperator>
                                            </Compare>
                                          </ScalarOperator>
                                        </Condition>
                                        <Then>
                                          <ScalarOperator>
                                            <Const ConstValue="'U'" />
                                          </ScalarOperator>
                                        </Then>
                                        <Else>
                                          <ScalarOperator>
                                            <Identifier>
                                              <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                            </Identifier>
                                          </ScalarOperator>
                                        </Else>
                                      </IF>
                                    </ScalarOperator>
                                  </Convert>
                                </ScalarOperator>
                              </DefinedValue>
                              <DefinedValue>
                                <ColumnReference Column="Expr1004" />
                                <ScalarOperator ScalarString="CONVERT(bit,[testdb].[sys].[sysschobjs].[status] as [o].[status]&amp;(1),0)">
                                  <Convert DataType="bit" Style="0" Implicit="false">
                                    <ScalarOperator>
                                      <Arithmetic Operation="BIT_AND">
                                        <ScalarOperator>
                                          <Identifier>
                                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                          </Identifier>
                                        </ScalarOperator>
                                        <ScalarOperator>
                                          <Const ConstValue="(1)" />
                                        </ScalarOperator>
                                      </Arithmetic>
                                    </ScalarOperator>
                                  </Convert>
                                </ScalarOperator>
                              </DefinedValue>
                              <DefinedValue>
                                <ColumnReference Column="Expr1007" />
                                <ScalarOperator ScalarString="CONVERT(bit,[testdb].[sys].[sysschobjs].[status] as [o].[status]&amp;(16),0)">
                                  <Convert DataType="bit" Style="0" Implicit="false">
                                    <ScalarOperator>
                                      <Arithmetic Operation="BIT_AND">
                                        <ScalarOperator>
                                          <Identifier>
                                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                          </Identifier>
                                        </ScalarOperator>
                                        <ScalarOperator>
                                          <Const ConstValue="(16)" />
                                        </ScalarOperator>
                                      </Arithmetic>
                                    </ScalarOperator>
                                  </Convert>
                                </ScalarOperator>
                              </DefinedValue>
                              <DefinedValue>
                                <ColumnReference Column="Expr1008" />
                                <ScalarOperator ScalarString="CONVERT(bit,[testdb].[sys].[sysschobjs].[status] as [o].[status]&amp;(64),0)">
                                  <Convert DataType="bit" Style="0" Implicit="false">
                                    <ScalarOperator>
                                      <Arithmetic Operation="BIT_AND">
                                        <ScalarOperator>
                                          <Identifier>
                                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                          </Identifier>
                                        </ScalarOperator>
                                        <ScalarOperator>
                                          <Const ConstValue="(64)" />
                                        </ScalarOperator>
                                      </Arithmetic>
                                    </ScalarOperator>
                                  </Convert>
                                </ScalarOperator>
                              </DefinedValue>
                            </DefinedValues>
                            <RelOp AvgRowSize="176" EstimateCPU="0.0031941" EstimateIO="0.0305324" EstimateRebinds="0" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="3" EstimatedRowsRead="2761" LogicalOp="Clustered Index Scan" NodeId="4" Parallel="false" PhysicalOp="Clustered Index Scan" EstimatedTotalSubtreeCost="0.0337265" TableCardinality="2761">
                              <OutputList>
                                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                                <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                              </OutputList>
                              <IndexScan Ordered="false" ForcedIndex="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                                <DefinedValues>
                                  <DefinedValue>
                                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="name" />
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsid" />
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="status" />
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pid" />
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="created" />
                                  </DefinedValue>
                                  <DefinedValue>
                                    <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="modified" />
                                  </DefinedValue>
                                </DefinedValues>
                                <Object Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Index="[clst]" Alias="[o]" IndexKind="Clustered" Storage="RowStore" />
                                <Predicate>
                                  <ScalarOperator ScalarString="[testdb].[sys].[sysschobjs].[nsclass] as [o].[nsclass]=(0) AND [testdb].[sys].[sysschobjs].[pclass] as [o].[pclass]=(1) AND CONVERT(char(2),CASE WHEN [testdb].[sys].[sysschobjs].[type] as [o].[type]='ET' THEN 'U' ELSE [testdb].[sys].[sysschobjs].[type] as [o].[type] END,0)='U'">
                                    <Logical Operation="AND">
                                      <ScalarOperator>
                                        <Compare CompareOp="EQ">
                                          <ScalarOperator>
                                            <Identifier>
                                              <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="nsclass" />
                                            </Identifier>
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Const ConstValue="(0)" />
                                          </ScalarOperator>
                                        </Compare>
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Compare CompareOp="EQ">
                                          <ScalarOperator>
                                            <Identifier>
                                              <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="pclass" />
                                            </Identifier>
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Const ConstValue="(1)" />
                                          </ScalarOperator>
                                        </Compare>
                                      </ScalarOperator>
                                      <ScalarOperator>
                                        <Compare CompareOp="EQ">
                                          <ScalarOperator>
                                            <Convert DataType="char" Length="2" Style="0" Implicit="false">
                                              <ScalarOperator>
                                                <IF>
                                                  <Condition>
                                                    <ScalarOperator>
                                                      <Compare CompareOp="EQ">
                                                        <ScalarOperator>
                                                          <Identifier>
                                                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                                          </Identifier>
                                                        </ScalarOperator>
                                                        <ScalarOperator>
                                                          <Const ConstValue="'ET'" />
                                                        </ScalarOperator>
                                                      </Compare>
                                                    </ScalarOperator>
                                                  </Condition>
                                                  <Then>
                                                    <ScalarOperator>
                                                      <Const ConstValue="'U'" />
                                                    </ScalarOperator>
                                                  </Then>
                                                  <Else>
                                                    <ScalarOperator>
                                                      <Identifier>
                                                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                                      </Identifier>
                                                    </ScalarOperator>
                                                  </Else>
                                                </IF>
                                              </ScalarOperator>
                                            </Convert>
                                          </ScalarOperator>
                                          <ScalarOperator>
                                            <Const ConstValue="'U'" />
                                          </ScalarOperator>
                                        </Compare>
                                      </ScalarOperator>
                                    </Logical>
                                  </ScalarOperator>
                                </Predicate>
                              </IndexScan>
                            </RelOp>
                          </ComputeScalar>
                        </RelOp>
                        <Predicate>
                          <ScalarOperator ScalarString="has_access('CO',[testdb].[sys].[sysschobjs].[id] as [o].[id])=(1)">
                            <Compare CompareOp="EQ">
                              <ScalarOperator>
                                <Intrinsic FunctionName="has_access">
                                  <ScalarOperator>
                                    <Const ConstValue="'CO'" />
                                  </ScalarOperator>
                                  <ScalarOperator>
                                    <Identifier>
                                      <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                    </Identifier>
                                  </ScalarOperator>
                                  <ScalarOperator>
                                    <Const ConstValue="" />
                                  </ScalarOperator>
                                  <ScalarOperator>
                                    <Const ConstValue="" />
                                  </ScalarOperator>
                                </Intrinsic>
                              </ScalarOperator>
                              <ScalarOperator>
                                <Const ConstValue="(1)" />
                              </ScalarOperator>
                            </Compare>
                          </ScalarOperator>
                        </Predicate>
                      </Filter>
                    </RelOp>
                    <RelOp AvgRowSize="11" EstimateCPU="0.0001581" EstimateIO="0.003125" EstimateRebinds="2" EstimateRewinds="0" EstimatedExecutionMode="Row" EstimateRows="1" EstimatedRowsRead="1" LogicalOp="Clustered Index Seek" NodeId="5" Parallel="false" PhysicalOp="Clustered Index Seek" EstimatedTotalSubtreeCost="0.0035993" TableCardinality="198">
                      <OutputList>
                        <ColumnReference Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                      </OutputList>
                      <IndexScan Ordered="true" ScanDirection="FORWARD" ForcedIndex="false" ForceSeek="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                        <DefinedValues>
                          <DefinedValue>
                            <ColumnReference Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="indepid" />
                          </DefinedValue>
                        </DefinedValues>
                        <Object Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Index="[clst]" Alias="[r]" IndexKind="Clustered" Storage="RowStore" />
                        <SeekPredicates>
                          <SeekPredicateNew>
                            <SeekKeys>
                              <Prefix ScanType="EQ">
                                <RangeColumns>
                                  <ColumnReference Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="depid" />
                                  <ColumnReference Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="class" />
                                  <ColumnReference Database="[testdb]" Schema="[sys]" Table="[syssingleobjrefs]" Alias="[r]" Column="depsubid" />
                                </RangeColumns>
                                <RangeExpressions>
                                  <ScalarOperator ScalarString="[testdb].[sys].[sysschobjs].[id] as [o].[id]">
                                    <Identifier>
                                      <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="id" />
                                    </Identifier>
                                  </ScalarOperator>
                                  <ScalarOperator ScalarString="(97)">
                                    <Const ConstValue="(97)" />
                                  </ScalarOperator>
                                  <ScalarOperator ScalarString="(0)">
                                    <Const ConstValue="(0)" />
                                  </ScalarOperator>
                                </RangeExpressions>
                              </Prefix>
                            </SeekKeys>
                          </SeekPredicateNew>
                        </SeekPredicates>
                      </IndexScan>
                    </RelOp>
                  </NestedLoops>
                </RelOp>
                <RelOp AvgRowSize="71" EstimateCPU="0.0001581" EstimateIO="0.003125" EstimateRebinds="1.49621" EstimateRewinds="0.512986" EstimatedExecutionMode="Row" EstimateRows="1" EstimatedRowsRead="1" LogicalOp="Clustered Index Seek" NodeId="6" Parallel="false" PhysicalOp="Clustered Index Seek" EstimatedTotalSubtreeCost="0.00360075" TableCardinality="163">
                  <OutputList>
                    <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="name" />
                  </OutputList>
                  <IndexScan Ordered="true" ScanDirection="FORWARD" ForcedIndex="false" ForceSeek="false" ForceScan="false" NoExpandHint="false" Storage="RowStore">
                    <DefinedValues>
                      <DefinedValue>
                        <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="name" />
                      </DefinedValue>
                    </DefinedValues>
                    <Object Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Index="[cl]" Alias="[n]" IndexKind="Clustered" Storage="RowStore" />
                    <SeekPredicates>
                      <SeekPredicateNew>
                        <SeekKeys>
                          <Prefix ScanType="EQ">
                            <RangeColumns>
                              <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="class" />
                              <ColumnReference Database="[mssqlsystemresource]" Schema="[sys]" Table="[syspalnames]" Alias="[n]" Column="value" />
                            </RangeColumns>
                            <RangeExpressions>
                              <ScalarOperator ScalarString="'OBTY'">
                                <Const ConstValue="'OBTY'" />
                              </ScalarOperator>
                              <ScalarOperator ScalarString="[testdb].[sys].[sysschobjs].[type] as [o].[type]">
                                <Identifier>
                                  <ColumnReference Database="[testdb]" Schema="[sys]" Table="[sysschobjs]" Alias="[o]" Column="type" />
                                </Identifier>
                              </ScalarOperator>
                            </RangeExpressions>
                          </Prefix>
                        </SeekKeys>
                      </SeekPredicateNew>
                    </SeekPredicates>
                  </IndexScan>
                </RelOp>
              </NestedLoops>
            </RelOp>
            <ParameterList>
              <ColumnReference Column="@1" ParameterDataType="varchar(8000)" ParameterCompiledValue="'U'" />
            </ParameterList>
          </QueryPlan>
        </StmtSimple>
      </Statements>
    </Batch>
  </BatchSequence>
</ShowPlanXML>
`;
