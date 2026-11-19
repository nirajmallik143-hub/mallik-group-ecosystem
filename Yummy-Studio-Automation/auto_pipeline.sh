#!/data/data/com.termux/files/usr/bin/bash

# 1. Prevent Android from killing Termux CPU process
termux-wake-lock

# 2. Log start time
echo "==========================================" >> ~/pipeline.log
echo "Pipeline Auto-Run Started at: $(date)" >> ~/pipeline.log

# 3. Activate Virtual Environment and run Python script
source ~/venv/bin/activate
python ~/quantum_yt_pipeline.py >> ~/pipeline.log 2>&1

# 4. Log completion time
echo "Pipeline Finished at: $(date)" >> ~/pipeline.log
echo "==========================================" >> ~/pipeline.log

# 5. Release wake lock
termux-wake-unlock
