The COVID-19 pandemic has drastically reshaped the economic landscape, leading to a significant surge in new business formations. This trend represents a pivotal shift in entrepreneurial activity and economic recovery. Business formation and entrepreneurship witnessed unprecedented growth during the pandemic, with a 60% year-over-year increase into 2021. This surge reflects a robust economic rebound and the emergence of new market opportunities.

![Business Formation Rates](<PUBLIC_URL>/content/bfr.png)
<div className="text-center text-sm mb-8">Figure 1: <a href="https://www.bls.gov/bdm/">U.S. Bureau of Labor Statistics</a></div >


The [White House's analysis](https://www.whitehouse.gov/cea/written-materials/2024/01/11/new-business-surge-unveiling-the-business-application-boom-through-an-analysis-of-administrative-data/) provides deeper insights, attributing the increase to several factors:

- Economic Stimulus and Support: Federal support programs for small businesses have encouraged new ventures.

![CashAssets](<PUBLIC_URL>/content/deposits.png)
<div className="text-center text-sm mb-8">Figure 2: <a href="https://fred.stlouisfed.org/series/DPSACBQ158SBOG">St. Louis Fed</a></div >

- Gig Economy Growth: Many individuals formalized gig work into business entities.

![BusinessApplications](<PUBLIC_URL>/content/hpba.png)
<div className="text-center text-sm mb-8">Figure 3: <a href="https://fred.stlouisfed.org/series/BAHBATOTALSAUS">St. Louis Fed</a></div >

- New Consumption Patterns: Pandemic-driven changes in consumer behavior spurred new business opportunities.

- Work-Life Balance Preferences: A shift in work-life balance preferences led many to pursue entrepreneurship.

![WFH Share](<PUBLIC_URL>/content/wfh.png)
<div className="text-center text-sm mb-8">Figure 4: <a href="https://www.nber.org/papers/w28731">Barrero, Jose Maria, Nicholas Bloom, and Steven J. Davis</a></div >


## LSTMs in Time Series Forecasting

In a typical LSTM forecasting setup, the network consists of an LSTM encoder and a Multi-Layer Perceptron (MLP) decoder. The LSTM encoder processes the input sequence to produce hidden states, which are then transformed into context vectors. The MLP decoder takes these context vectors and generates the predictions for future time steps.

#### Key Parameters:

Input Size ($$I$$): The maximum sequence length for truncated backpropagation through time. This defines the window of past time steps used as input to the LSTM.

Forecast Horizon ($$H$$): The number of future time steps the model aims to predict.

![lstminputvis](<PUBLIC_URL>/content/lstminputvis.png)
<div className="text-center text-sm mb-8">Figure 7: LSTM input size visualization.</div >

## Methodology

1: Input Window

The input window consists of a sequence of past time steps up to the current time 
$t$:

$$x_{t−I},x_{t−(I−1)},…,x_{t−1},x_{t}$$

​These are the input features consisting of the exogenous variables and/or the target variable.

2: LSTM Encoder

Each input $x$ is passed through the LSTM cells sequentially, which generate hidden states 
$h$ for each time step:

$$h_{t-i} = LSTM(x_{t-i}, h_{t-i-1})$$

for $i \in [0, I]$. The hidden state at the final time step, 
$h_{t}$, summarizes the information from the entire input sequence.

3: Context Vector

The final hidden state 
$h_{t}$ is transformed into a context vector 
$c_{t+1:t+H}$

$$c_{t+1:t+H} = Transform(h_{t})$$

This context vector captures the necessary information to predict future values.

4: MLP Decoder

The context vector $c_{t+1:t+H}$ is decoded and adapted by network to produce the predictions 
$\hat{y}_{t+1:t+H}$

$$\hat{y}_{t+j} = MLP(c_{t+1:t+H})$$

for $j \in [1, H]$. These predictions represent the forecasted values for the next 
$H$ time steps.

## Experiments

We tasked LSTM models to forecast quarterly data of business birth rates using 500 exogenous variables pulled from the FRED API. The models were tasked with making single-step predictions, forecasting one quarter into the future based on previous data. We tested the models with and without two key variables: work from home (WFH) and regulation per capita as well as with varying context input sizes. The forecast horizon was set to 7 quarters corresponding to the peak of business formation rates occurring at the end of 2021.

## Results
After training the LSTM models, we compared the post-COVID business formation rates with and without two key variables: work from home (WFH) and regulation per capita:

<div className="overflow-x-auto mb-8 flex justify-center">
    <table className="border table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="border text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th colspan="2" className="border py-3 px-6">Data</th>
                <th colspan="2" className="border py-3 px-6">LSTM/7</th>
            </tr>
            <tr>
                <th colspan="2" className="border py-3 px-6">Metric</th>
                <th className="border py-3 px-6">MSE</th>
                <th className="border py-3 px-6">MAE</th>
            </tr>
        </thead>
        <tbody className="border bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <tr>
                <th rowspan="3" className="border py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Reg</th>
                <td className="border py-4 px-6">24</td>
                <td className="border py-4 px-6">0.259</td>
                <td className="border py-4 px-6">0.474</td>
            </tr>
            <tr>
                <td className="border py-4 px-6">48</td>
                <td className="border py-4 px-6">0.117</td>
                <td className="border py-4 px-6">0.319</td>
            </tr>
            <tr>
                <td className="border py-4 px-6">72</td>
                <td className="border py-4 px-6">0.190</td>
                <td className="border py-4 px-6">0.396</td>
            </tr>
            <tr>
                <th rowspan="3" className="border py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">WFH</th>
                <td className="border py-4 px-6">24</td>
                <td className="border py-4 px-6">0.124</td>
                <td className="border py-4 px-6">0.342</td>
            </tr>
            <tr>
                <td className="border py-4 px-6">48</td>
                <td className="border py-4 px-6">0.199</td>
                <td className="border py-4 px-6">0.421</td>
            </tr>
            <tr>
                <td className="border py-4 px-6">72</td>
                <td className="border py-4 px-6">0.080</td>
                <td className="border py-4 px-6">0.274</td>
            </tr>
            <tr>
                <th rowspan="3" className="border py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">WFH+REG</th>
                <td className="border py-4 px-6">24</td>
                <td className="border py-4 px-6">0.210</td>
                <td className="border py-4 px-6">0.441</td>
            </tr>
            <tr>
                <td className="border py-4 px-6">48</td>
                <td className="border py-4 px-6">0.115</td>
                <td className="border py-4 px-6">0.312</td>
            </tr>
            <tr>
                <td className="border py-4 px-6">72</td>
                <td className="border py-4 px-6">0.188</td>
                <td className="border py-4 px-6">0.416</td>
            </tr>
            <tr>
                <th rowspan="3" className="border py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Base</th>
                <td className="border py-4 px-6">24</td>
                <td className="border py-4 px-6">0.501</td>
                <td className="border py-4 px-6">0.603</td>
            </tr>
            <tr>
                <td className="border py-4 px-6">48</td>
                <td className="border py-4 px-6">0.267</td>
                <td className="border py-4 px-6">0.486</td>
            </tr>
            <tr>
                <td className="border py-4 px-6">72</td>
                <td className="border py-4 px-6">0.330</td>
                <td className="border py-4 px-6">0.538</td>
            </tr>
        </tbody>
    </table>
</div>

![MSELSTM7](<PUBLIC_URL>/content/MSELSTM7.png)
<div className="text-center text-sm mb-8">Figure 5: Mean Squared Error over various input sizes (L) of LSTM with 7 quarter horizon.</div >

![MAELSTM7](<PUBLIC_URL>/content/MAELSTM7.png)
<div className="text-center text-sm mb-8">Figure 6: Mean Absolute Error over various input sizes (L) of LSTM with 7 quarter horizon.</div >

#### Baseline Model Performance:

The baseline model, which did not include WFH or regulation variables, consistently showed the highest error rates across all input sizes, with an MSE of 0.501 for 24 quarters and an MAE of 0.603. This model's errors decreased with increased input size, reaching the lowest errors (MSE: 0.267, MAE: 0.486) at 48 quarters, but then slightly increased at 72 quarters. This suggests that the baseline model benefits from more historical data but still lacks predictive accuracy without key variables.

#### Impact of Work From Home (WFH) Variable:

The inclusion of the WFH variable significantly improved the model's performance, particularly at larger input sizes. For instance, the model with WFH had an MSE of 0.124 at 24 quarters, which further decreased to 0.080 at 72 quarters. The MAE also showed improvement, reducing from 0.342 to 0.274. This suggests that WFH is a strong predictor of business formation rates, likely due to its correlation with new business trends post-COVID.

#### Impact of Regulation Per Capita Variable:

The model that included the regulation variable (Reg) also demonstrated improved performance over the baseline. At 24 quarters, the MSE was 0.259, and it improved to 0.117 at 48 quarters before slightly increasing to 0.190 at 72 quarters. The MAE followed a similar trend, indicating that regulation per capita has a notable but slightly less consistent impact compared to WFH.

#### Combined Impact of WFH and Regulation Variables:

Combining both WFH and regulation variables (WFH+REG) resulted in a model that performed well, though not consistently better than the models with individual variables. The MSE at 24 quarters was 0.210, which improved to 0.115 at 48 quarters but slightly increased to 0.188 at 72 quarters. The MAE showed similar trends. This suggests that while both variables are important, their combined predictive power does not always outperform the models using single key variables.

The slight increase in error for some models at the largest input size (72 quarters) indicates potential overfitting or the presence of diminishing returns. This suggests that while more data can improve model performance, there is a threshold beyond which additional data may not provide further benefits and might even degrade performance.

#### Permutation Importance Calculation:

Let $X$ be the matrix representing the exogenous variables, with dimensions $m \times n$, where $m$ is the number of observations and $n$ is the number of features. The target variable is represented by $y$, a vector of length $m$.

Let $f(X)$ denote the predictive model trained on the dataset $X$ to predict the target variable $y$. The importance of feature $i$, denoted as $\text{Importance}_i$, is calculated as follows:

1: **Baseline Model:** Train the predictive model $f(X)$ on the original dataset $X$ and compute the baseline performance metric, denoted as $\text{MSE}_{\text{baseline}}$ (or another suitable metric).
    
2: **Permutation of Feature $i$:** For each feature $i$, permute its values by a random normal distribution centered at 0 in the dataset $X$ while keeping other features unchanged. Denote the permuted dataset as $X_i^*$. Recalculate the predictions using the model $f(X_i^*)$ and compute the performance metric, denoted as $\text{MSE}_i$.
    
3: **Importance Calculation:** The importance of feature $i$ is computed as the difference between the baseline performance metric and the performance metric obtained after permutation:
    
$$\text{Importance}_i = \text{MSE}_{\text{baseline}} - \text{MSE}_i$$
    
The greater the decrease in performance metric after permutation, the more important the feature $i$ is considered.

![wfhvsreg](<PUBLIC_URL>/content/wfhvsreg.png)
<div className="text-center text-sm mb-8">Figure 7: Permutation Importance of WFH and Regulation Variables.</div >

![top10feats](<PUBLIC_URL>/content/top10feats.png)
<div className="text-center text-sm mb-8">Figure 8: Top 10 features with the highest permutation importance.</div >

